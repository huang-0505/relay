import { NextResponse } from 'next/server'
import { generateBriefing } from '@/lib/claude'
import { isKnownLeadId } from '@/lib/mock-marketo'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.' },
      { status: 400 },
    )
  }

  const leadId = extractLeadId(body)
  if (!leadId) {
    return NextResponse.json(
      { error: 'Request body must include a string "leadId".' },
      { status: 400 },
    )
  }

  if (!isKnownLeadId(leadId)) {
    return NextResponse.json(
      { error: `Unknown leadId: ${leadId}` },
      { status: 400 },
    )
  }

  try {
    const briefing = await generateBriefing(leadId)
    return NextResponse.json(briefing)
  } catch (err) {
    console.error('[generate-briefing] generation failed:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function extractLeadId(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null
  const leadId = (body as Record<string, unknown>).leadId
  if (typeof leadId !== 'string' || leadId.length === 0) return null
  return leadId
}
