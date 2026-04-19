export type LeadRating = 'HOT' | 'WARM' | 'COOL' | 'MQL' | 'EARLY'

export type OpportunityStage = 'New' | 'Qualify' | 'Develop' | 'Propose'

export type RelayState =
  | { kind: 'ready'; featured?: boolean }
  | { kind: 'working' }
  | { kind: 'skipped'; reason: string }
  | { kind: 'monitoring'; reason: string }
  | { kind: 'stale' }

export interface Lead {
  name: string
  role: string
  company: string
  location?: string
}

export interface OpportunityValue {
  amount?: string
  note?: string
}

export interface Opportunity {
  id: string
  priority?: number
  title: string
  rating: { label: LeadRating; score?: number }
  leadName: string
  leadContext: string
  stage: OpportunityStage
  value: OpportunityValue
  relay: RelayState
  briefingId?: string
}

export interface MqlTrigger {
  score: number
  description: string
}

export interface FactBox {
  label: string
  value: string
  note: string
}

export interface ProductFit {
  name: string
  why: string
  fit: number
  topPick?: boolean
}

export interface TalkPoint {
  headline: string
  body: string
}

export interface InsightCard {
  tag: 'Signal' | 'Role' | 'Timing' | 'Risk'
  headline: string
  body: string
}

export interface SignalItem {
  text: string
  emphasis?: string
}

export interface SignalDepth {
  intro: string
  generic: { subhead: string; items: SignalItem[] }
  relay: { subhead: string; items: SignalItem[] }
}

export type SourceKind = 'lenovo' | 'marketo' | 'public'

export interface Source {
  label: string
  kind: SourceKind
}

export interface DataSourceSummary {
  kind: SourceKind
  label: string
  sub: string
}

export interface BriefingQuality {
  duration: string
  sourcesCited: number
  confidence: number
  note: string
}

export interface Briefing {
  id: string
  generatedMinutesAgo: number
  breadcrumb: string
  headline: string
  lead: Lead
  summary: string
  mqlTrigger: MqlTrigger
  facts: FactBox[]
  productsTag: string
  products: ProductFit[]
  talkPoints: TalkPoint[]
  accountContext: string[]
  whyDownloaded: InsightCard[]
  signalDepth: SignalDepth
  sources: Source[]
  sourcesCount: number
  quality: BriefingQuality
  dataSources: DataSourceSummary[]
}

export interface StatBox {
  label: string
  value: string
  unit?: string
  delta: string
  deltaTone?: 'positive' | 'negative'
}

export interface GreetingData {
  time: string
  title: string
  titleEm: string
  titleTail: string
  sub: string
}

export interface RelayStatus {
  enrichedOvernight: number
  skipped: number
  avgDuration: string
  lastSync: string
  connected: string[]
}

export type BehavioralEventType =
  | 'page_view'
  | 'download'
  | 'form_fill'
  | 'email_open'
  | 'search'

export interface BehavioralEvent {
  timestamp: string
  event_type: BehavioralEventType
  asset: string
  duration_seconds?: number
}

export interface FormFill {
  form: string
  completed: boolean
  skipped_fields?: string[]
}

export interface MarketoLeadIdentity {
  name: string
  title: string
  email: string
  company: string
  location: string
}

export interface MarketoLead {
  id: string
  identity: MarketoLeadIdentity
  score: number
  campaign_source: string
  engagement_rhythm: string
  form_fills: FormFill[]
  behavioral_events: BehavioralEvent[]
  account_notes: string
  incumbent: string
  known_partner_stack: string[]
  budget_signal: string
  timeline_signal: string
  relevant_battle_cards: string[]
}

export interface ProductSpec {
  name: string
  cpu: string
  gpu: string
  ram: string
  iso_certs: string[]
  workload_profile: string
  price_range: string
}

export interface BattleCard {
  topic: string
  title: string
  key_points: string[]
  talking_points: string[]
  proof_points: string[]
}
