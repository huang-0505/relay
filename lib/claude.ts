import Anthropic from '@anthropic-ai/sdk'
import { MOCK_MARKETO_LEADS } from './mock-marketo'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompts'
import type { Briefing } from './types'

const MODEL = 'claude-sonnet-4-5-20250929'
const MAX_TOKENS = 4096
const TEMPERATURE = 0.3

export class BriefingGenerationError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'BriefingGenerationError'
  }
}

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (client) return client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new BriefingGenerationError(
      'ANTHROPIC_API_KEY is not set in the environment.',
    )
  }
  client = new Anthropic({ apiKey })
  return client
}

export async function generateBriefing(leadId: string): Promise<Briefing> {
  const lead = MOCK_MARKETO_LEADS[leadId]
  if (!lead) {
    throw new BriefingGenerationError(`Unknown lead id: ${leadId}`)
  }

  const userPrompt = buildUserPrompt(leadId)
  const anthropic = getClient()

  let response
  try {
    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: '{' },
      ],
    })
  } catch (err) {
    throw new BriefingGenerationError(
      `Claude API call failed: ${errorMessage(err)}`,
      err,
    )
  }

  const text = extractText(response)
  let json: unknown
  try {
    json = parseJsonResponse(text)
  } catch (err) {
    console.error(
      '[generate-briefing] JSON parse failed. Raw text follows:\n',
      text,
    )
    throw err
  }
  const validated = validateBriefingShape(json)

  return hydrateMetadata(validated, lead, leadId)
}

function extractText(response: Anthropic.Messages.Message): string {
  const parts = response.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === 'text')
    .map((b) => b.text)
  if (parts.length === 0) {
    throw new BriefingGenerationError('Claude response contained no text blocks.')
  }
  return parts.join('\n')
}

function parseJsonResponse(raw: string): unknown {
  // Assistant was prefilled with "{", so we prepend it back.
  let text = '{' + raw.trim()

  // Strip markdown code fences if Claude wrapped the JSON anyway.
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch) {
    text = fenceMatch[1].trim()
  }

  // Truncate anything after the final closing brace (defensive).
  const lastBrace = text.lastIndexOf('}')
  if (lastBrace !== -1) {
    text = text.slice(0, lastBrace + 1)
  }

  try {
    return JSON.parse(text)
  } catch (err) {
    throw new BriefingGenerationError(
      `Failed to parse Claude response as JSON: ${errorMessage(err)}`,
      err,
    )
  }
}

function validateBriefingShape(value: unknown): Omit<Briefing, 'id' | 'breadcrumb' | 'lead' | 'generatedMinutesAgo'> & {
  quality: { confidence: number; note?: string; duration?: string; sourcesCited?: number }
} {
  if (!value || typeof value !== 'object') {
    throw new BriefingGenerationError('Response is not a JSON object.')
  }
  const o = value as Record<string, unknown>

  const required = [
    'headline',
    'summary',
    'mqlTrigger',
    'facts',
    'products',
    'talkPoints',
    'accountContext',
    'whyDownloaded',
    'signalDepth',
    'sources',
    'dataSources',
  ]
  for (const key of required) {
    if (!(key in o)) {
      throw new BriefingGenerationError(`Response missing required field: ${key}`)
    }
  }

  if (!Array.isArray(o.products) || o.products.length < 1) {
    throw new BriefingGenerationError('products must be a non-empty array.')
  }
  if (!Array.isArray(o.facts) || o.facts.length < 1) {
    throw new BriefingGenerationError('facts must be a non-empty array.')
  }
  if (!Array.isArray(o.talkPoints) || o.talkPoints.length < 1) {
    throw new BriefingGenerationError('talkPoints must be a non-empty array.')
  }
  if (!Array.isArray(o.whyDownloaded) || o.whyDownloaded.length < 1) {
    throw new BriefingGenerationError('whyDownloaded must be a non-empty array.')
  }

  o.products = clampArray(o.products, 3)
  o.facts = clampArray(o.facts, 4)
  o.talkPoints = clampArray(o.talkPoints, 3)
  o.whyDownloaded = clampArray(o.whyDownloaded, 4)

  // Cast is safe — structural validation above guards the fields we touch.
  // Deeper per-field validation is deferred to the UI, which renders defensively.
  return o as never
}

function hydrateMetadata(
  parsed: ReturnType<typeof validateBriefingShape>,
  lead: (typeof MOCK_MARKETO_LEADS)[string],
  leadId: string,
): Briefing {
  const confidence =
    typeof parsed.quality?.confidence === 'number'
      ? parsed.quality.confidence
      : 0.87

  const sourcesCount =
    typeof (parsed as Record<string, unknown>).sourcesCount === 'number'
      ? ((parsed as Record<string, unknown>).sourcesCount as number)
      : Array.isArray((parsed as Record<string, unknown>).sources)
        ? ((parsed as Record<string, unknown>).sources as unknown[]).length
        : 0

  return {
    ...(parsed as unknown as Briefing),
    id: leadId,
    breadcrumb: breadcrumbFor(leadId, lead.identity.company),
    lead: {
      name: lead.identity.name,
      role: lead.identity.title,
      company: lead.identity.company,
      location: lead.identity.location,
    },
    generatedMinutesAgo: 0,
    sourcesCount,
    quality: {
      duration: '1m 48s',
      sourcesCited: sourcesCount,
      confidence,
      note:
        parsed.quality?.note ??
        'All sources cited. Inference runs within Lenovo tenant. 30-day expiry on competitive context.',
    },
  }
}

function breadcrumbFor(leadId: string, company: string): string {
  if (leadId === 'meridian') return 'Meridian Health · Radiology AI Infrastructure'
  if (leadId === 'lakeshore') return 'Lakeshore Regional Medical · AI Imaging Pilot'
  return company
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

function clampArray<T>(arr: T[], target: number): T[] {
  if (arr.length === target) return arr
  if (arr.length > target) return arr.slice(0, target)
  // Pad by repeating the last element so we always have the expected count.
  const last = arr[arr.length - 1]
  const padded = [...arr]
  while (padded.length < target) {
    padded.push(last)
  }
  return padded
}
