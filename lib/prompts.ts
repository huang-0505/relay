import { battleCardsForLead, MOCK_BATTLE_CARDS } from './mock-battle-cards'
import { MOCK_MARKETO_LEADS } from './mock-marketo'
import { MOCK_PRODUCTS } from './mock-psref'
import type { MarketoLead, ProductSpec, BattleCard } from './types'

export const SYSTEM_PROMPT = `You are Relay, a sales intelligence agent that sits between Marketo (marketing automation) and Dynamics 365 (CRM). Lenovo's sales team uses you to turn newly-qualified leads (MQLs) into a first-call briefing a seller can actually use — before picking up the phone.

YOUR JOB
Given one lead's full Marketo behavioral stream, the relevant Lenovo product catalog (PSREF), and relevant competitive + ISV battle cards, produce a first-call briefing as a single JSON object matching the schema the user will provide.

VOICE — CRITICAL
- Editorial, enterprise, precise. Write like a senior sales engineer briefing a rep who has 8 minutes before the call.
- NOT AI-generated slop. No hedge words. No "leveraging", "unlock", "empower", "synergy", "in today's fast-paced world".
- Every tactical sentence has a concrete verb and a concrete object. "Ask where inference latency shows up in workflow" beats "explore their AI needs".
- Match the reference style in the schema's example values. Short, declarative, specific.

GROUNDING RULES
- Only cite facts that appear in the input data (marketo lead, products, battle cards). Never invent a person, a partnership, a metric, or a product.
- If the input doesn't support a claim, don't make it. Prefer "the data does not show" to making something up.
- When you mention a product, it must be one of the products in the catalog. When you mention an ISV, it must appear in that product's iso_certs or in a battle card.
- Bold key entities (people, companies, products, partnerships, competitive incumbents) using Markdown **bold** syntax — but ONLY in these fields: summary, mqlTrigger.description, accountContext[], signalDepth.relay.items[].text. Never in facts, talkPoints, whyDownloaded.

PRODUCT SELECTION
- Recommend exactly 3 products from the catalog. Sort by fit score, highest first. The highest-fit product gets topPick: true.
- Fit is 0.0–1.0. Anchor it: ~0.9+ for a clear match on workload + ISV certification + price band; ~0.7–0.85 for a solid secondary fit; ~0.4–0.6 for a marginal option worth mentioning with a caveat.
- If a product is clearly inappropriate (e.g. a business desktop for a radiology AI workload), do NOT include it in your top 3.
- The 'why' field for each product must reference specifics from the catalog or lead (cpu/gpu/ISV cert/workload match) — not generic praise.

SIGNAL DEPTH
- generic.items: 4 flat field-level facts a D365-synced system would have (score, source, last activity, campaign).
- relay.items: 4 behavioral-stream observations that require access to the raw Marketo data. Each one must start with a bolded label ("**Visit sequence**:", "**Content affinity**:", "**Engagement rhythm**:", "**Form fill pattern**:") and end with a specific observation drawn from the behavioral_events / form_fills / engagement_rhythm in the input.

SOURCES
- List every input source the briefing draws on: Marketo behavioral stream (kind: marketo), each Lenovo asset used — PSREF, battle cards, ISV matrix (kind: lenovo), and public web sources like company press pages / LinkedIn profiles of named people (kind: public).

OUTPUT
Return exactly one JSON object. No prose before or after. No markdown code fence. Start your response with the character { and end with }.`

const SCHEMA_TEXT = `{
  "headline": "<one sentence, <=160 chars, captures buyer intent + the timing or competitive angle. No bold markers here.>",
  "summary": "<2-4 sentences. Include **bold** around key entities (people, companies, partnerships, products).>",
  "mqlTrigger": {
    "score": <integer from input lead.score>,
    "description": "<1 sentence describing what triggered the MQL. Format: 'Triggered by **<asset name>** · <campaign / source context>'.>"
  },
  "facts": [
    { "label": "Role",        "value": "<<=6 words>", "note": "<<=8 words, lowercase, no period>" },
    { "label": "Urgency",     "value": "<<=6 words>", "note": "<<=8 words>" },
    { "label": "Intent",      "value": "<<=6 words>", "note": "<<=8 words>" },
    { "label": "Competition", "value": "<<=6 words>", "note": "<<=8 words>" }
  ],
  "productsTag": "Lenovo · PSREF + ISV Matrix",
  "products": [
    { "name": "<exact product name from catalog>", "why": "<1 sentence tying CPU/GPU/ISV certs to this lead's workload>", "fit": <0.0-1.0>, "topPick": true },
    { "name": "<exact product name from catalog>", "why": "<1 sentence>", "fit": <0.0-1.0> },
    { "name": "<exact product name from catalog>", "why": "<1 sentence>", "fit": <0.0-1.0> }
  ],
  "talkPoints": [
    { "headline": "<short imperative sentence ending with period>", "body": "<1-2 sentences with concrete tactical advice>" },
    { "headline": "<...>", "body": "<...>" },
    { "headline": "<...>", "body": "<...>" }
  ],
  "accountContext": [
    "<paragraph 1: company + strategic context (announcements, partnerships, capital plans). Include **bold** on key entities.>",
    "<paragraph 2: org / decision-making context (who reports to whom, who to align with).>"
  ],
  "whyDownloaded": [
    { "tag": "Signal", "headline": "<3-5 words>", "body": "<1 sentence>" },
    { "tag": "Role",   "headline": "<3-5 words>", "body": "<1 sentence>" },
    { "tag": "Timing", "headline": "<3-5 words>", "body": "<1 sentence>" },
    { "tag": "Risk",   "headline": "<3-5 words>", "body": "<1 sentence>" }
  ],
  "signalDepth": {
    "intro": "<one italic-feeling sentence framing this as the evidence layer>",
    "generic": {
      "subhead": "~15 fields make it into Dataverse.",
      "items": [
        { "text": "Score: <number>" },
        { "text": "Source: <paid search / organic / etc>" },
        { "text": "Last activity: <short label>" },
        { "text": "Campaign: <short label>" }
      ]
    },
    "relay": {
      "subhead": "Full unfiltered behavioral stream.",
      "items": [
        { "text": "**Visit sequence**: <concrete ordered path from behavioral_events>" },
        { "text": "**Content affinity**: <ratio or pattern from behavioral_events>" },
        { "text": "**Engagement rhythm**: <from engagement_rhythm field>" },
        { "text": "**Form fill pattern**: <from form_fills>" }
      ]
    }
  },
  "sources": [
    { "label": "Marketo · Raw behavioral stream", "kind": "marketo" },
    { "label": "<Lenovo asset name>", "kind": "lenovo" },
    { "label": "<public web asset>", "kind": "public" }
  ],
  "sourcesCount": <integer count of total sources referenced (can be slightly higher than sources.length — represents the underlying source count, 8-14 typical)>,
  "dataSources": [
    { "kind": "marketo", "label": "Marketo · raw stream", "sub": "<N> behavioral events" },
    { "kind": "lenovo",  "label": "PSREF",                 "sub": "<N> SKUs matched" },
    { "kind": "lenovo",  "label": "Healthcare battle card", "sub": "<short context>" },
    { "kind": "lenovo",  "label": "ISV certification",     "sub": "<short context>" },
    { "kind": "public",  "label": "Public web",            "sub": "<N> sources" }
  ]
}`

function formatBehavioralEvents(lead: MarketoLead): string {
  return lead.behavioral_events
    .map((e, i) => {
      const dur = e.duration_seconds ? ` (${e.duration_seconds}s)` : ''
      return `  ${i + 1}. [${e.timestamp}] ${e.event_type.toUpperCase()} · ${e.asset}${dur}`
    })
    .join('\n')
}

function formatFormFills(lead: MarketoLead): string {
  return lead.form_fills
    .map((f, i) => {
      const status = f.completed ? 'completed' : 'abandoned'
      const skipped =
        f.skipped_fields && f.skipped_fields.length > 0
          ? ` (skipped: ${f.skipped_fields.join(', ')})`
          : ''
      return `  ${i + 1}. ${status}: "${f.form}"${skipped}`
    })
    .join('\n')
}

function formatProduct(p: ProductSpec): string {
  return `- ${p.name}
    CPU: ${p.cpu}
    GPU: ${p.gpu}
    RAM: ${p.ram}
    ISV certs: ${p.iso_certs.length > 0 ? p.iso_certs.join(', ') : '(none)'}
    Workload: ${p.workload_profile}
    Price: ${p.price_range}`
}

function formatBattleCard(c: BattleCard): string {
  return `### ${c.title} [${c.topic}]
Key points:
${c.key_points.map((p) => `  - ${p}`).join('\n')}
Talking points:
${c.talking_points.map((p) => `  - ${p}`).join('\n')}
Proof points:
${c.proof_points.map((p) => `  - ${p}`).join('\n')}`
}

export function buildUserPrompt(leadId: string): string {
  const lead = MOCK_MARKETO_LEADS[leadId]
  if (!lead) {
    throw new Error(`Unknown lead id: ${leadId}`)
  }

  const relevantCards = battleCardsForLead(lead.relevant_battle_cards)

  return `## LEAD (from Marketo)

Identity:
  Name: ${lead.identity.name}
  Title: ${lead.identity.title}
  Email: ${lead.identity.email}
  Company: ${lead.identity.company}
  Location: ${lead.identity.location}

Score: ${lead.score}
Campaign source: ${lead.campaign_source}
Engagement rhythm: ${lead.engagement_rhythm}

Behavioral events (${lead.behavioral_events.length} total):
${formatBehavioralEvents(lead)}

Form fills:
${formatFormFills(lead)}

Competitive incumbent: ${lead.incumbent}
Known / evaluated partner stack: ${lead.known_partner_stack.join(', ')}
Budget signal: ${lead.budget_signal}
Timeline signal: ${lead.timeline_signal}

Account notes:
${lead.account_notes}

## PRODUCT CATALOG (PSREF subset — you must pick 3 from this list)

${MOCK_PRODUCTS.map(formatProduct).join('\n\n')}

## BATTLE CARDS (relevant to this lead)

${relevantCards.map(formatBattleCard).join('\n\n')}

## SCHEMA (return exactly this shape as a single JSON object)

${SCHEMA_TEXT}

Produce the briefing now. Output the JSON object and nothing else.`
}

export const AVAILABLE_BATTLE_CARD_TOPICS = Object.keys(MOCK_BATTLE_CARDS)
