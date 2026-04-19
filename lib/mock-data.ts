import type {
  Briefing,
  GreetingData,
  Opportunity,
  RelayStatus,
  StatBox,
} from './types'

export const GREETING: GreetingData = {
  time: 'Monday · Apr 20, 2026 · 8:42 AM EST',
  title: 'Good morning, Marcus. ',
  titleEm: 'Seven things',
  titleTail: ' on your plate today.',
  sub: 'Relay prepared briefings for three MQLs overnight · two require action before noon.',
}

export const RELAY_STATUS: RelayStatus = {
  enrichedOvernight: 3,
  skipped: 1,
  avgDuration: '1m 52s',
  lastSync: '2 min ago',
  connected: ['Marketo', 'PSREF', 'Battle cards', 'ISV matrix'],
}

export const STATS: StatBox[] = [
  {
    label: 'Open Opportunities',
    value: '23',
    delta: '+3 this week',
    deltaTone: 'positive',
  },
  {
    label: 'Pipeline',
    value: '$2.4',
    unit: 'M',
    delta: '+$280K vs. last quarter',
    deltaTone: 'positive',
  },
  {
    label: 'New MQLs Today',
    value: '4',
    delta: '3 enriched by Relay',
    deltaTone: 'positive',
  },
  {
    label: 'Response Time',
    value: '4.2',
    unit: 'h',
    delta: 'target < 2h',
    deltaTone: 'negative',
  },
]

export const PRIORITY_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'meridian',
    priority: 1,
    title: 'Meridian Health · Radiology AI Infrastructure',
    rating: { label: 'HOT', score: 92 },
    leadName: 'Dr. Amelia Okafor',
    leadContext:
      'Director, Clinical Informatics · MQL via ThinkStation whitepaper · 14 min ago',
    stage: 'Develop',
    value: { note: 'est. Q3' },
    relay: { kind: 'ready', featured: true },
    briefingId: 'meridian',
  },
  {
    id: 'westfield',
    priority: 2,
    title: 'Westfield Medical Group · Endpoint Refresh',
    rating: { label: 'WARM', score: 68 },
    leadName: 'Ryan Chen',
    leadContext: 'Director of IT · Return visitor · 2 days ago',
    stage: 'Qualify',
    value: { amount: '$180K' },
    relay: { kind: 'ready' },
  },
  {
    id: 'ashford',
    priority: 3,
    title: 'Ashford Clinical Labs · ThinkSystem Quote Follow-up',
    rating: { label: 'MQL', score: 54 },
    leadName: 'Priya Raman',
    leadContext: 'Lab Director · Quote sent Apr 11 · awaiting reply',
    stage: 'Propose',
    value: { amount: '$94K' },
    relay: { kind: 'skipped', reason: 'Skipped · low fit score' },
  },
]

export const PIPELINE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'beacon-hill',
    title: 'Beacon Hill Imaging · ThinkStation trial',
    rating: { label: 'WARM' },
    leadName: '',
    leadContext: 'Follow-up scheduled for Thursday',
    stage: 'Develop',
    value: { amount: '$320K' },
    relay: { kind: 'monitoring', reason: 'Monitoring · no new signal' },
  },
  {
    id: 'cleveland-ortho',
    title: 'Cleveland Ortho Center · PC fleet proposal',
    rating: { label: 'WARM' },
    leadName: '',
    leadContext: 'Proposal under review · reply expected this week',
    stage: 'Propose',
    value: { amount: '$560K' },
    relay: { kind: 'monitoring', reason: 'Monitoring · no new signal' },
  },
  {
    id: 'pinnacle',
    title: 'Pinnacle Radiology Partners · Workstation eval',
    rating: { label: 'EARLY' },
    leadName: '',
    leadContext: 'No activity in 14 days',
    stage: 'Qualify',
    value: {},
    relay: { kind: 'stale' },
  },
]

export const MERIDIAN_BRIEFING: Briefing = {
  id: 'meridian',
  generatedMinutesAgo: 14,
  breadcrumb: 'Meridian Health · Radiology AI Infrastructure',
  headline:
    "Dr. Okafor is specifying hardware for Meridian's Aidoc radiology AI rollout. Q3 capex window closes in 10 weeks.",
  lead: {
    name: 'Dr. Amelia Okafor',
    role: 'Director, Clinical Informatics',
    company: 'Meridian Health System',
    location: 'Columbus, OH',
  },
  summary:
    "Dr. Amelia Okafor leads clinical informatics at Meridian Health — a three-hospital regional system in Columbus, OH. She reports up through CMIO Dr. Rakesh Pillai, a public advocate for on-prem AI inference. Meridian announced an **Aidoc partnership** in January for stroke and PE triage, and Dr. Okafor's behavior this week suggests she's scoping the workstation hardware side of that rollout. Existing Dell Precision fleet is due for refresh; no structural lock-in.",
  mqlTrigger: {
    score: 92,
    description:
      'Triggered by **"ThinkStation for Medical Imaging" whitepaper** download · paid search entry · healthcare AI campaign',
  },
  facts: [
    {
      label: 'Role',
      value: 'Influencer, not final decision',
      note: 'defers to CMIO + CIO',
    },
    {
      label: 'Urgency',
      value: '~10 weeks',
      note: 'Q3 capex lock, FY starts July',
    },
    {
      label: 'Intent',
      value: 'Hardware spec, not discovery',
      note: 'already past research stage',
    },
    {
      label: 'Competition',
      value: 'Dell Precision (incumbent)',
      note: 'real switch cost, no lock-in',
    },
  ],
  productsTag: 'Lenovo · PSREF + ISV Matrix',
  products: [
    {
      name: 'ThinkStation P8',
      why:
        "Threadripper PRO · RTX 6000 Ada. Matches Aidoc's on-prem inference spec. ISV-certified for medical imaging.",
      fit: 0.92,
      topPick: true,
    },
    {
      name: 'ThinkStation P5',
      why:
        'Xeon W · RTX A4000. Secondary reading station for phased rollout across 3 hospitals.',
      fit: 0.78,
    },
    {
      name: 'ThinkPad P16',
      why:
        'Mobile workstation for roaming informaticists. Mention only if asked.',
      fit: 0.54,
    },
  ],
  talkPoints: [
    {
      headline: 'Open with the Aidoc angle, not the hardware.',
      body:
        'Ask where inference latency shows up in workflow. Let her surface it, then bridge to ThinkStation.',
    },
    {
      headline: "Reference CMIO Pillai's on-prem stance.",
      body:
        "Signal you understand Meridian's philosophy. Differentiator vs. cloud-first competitors.",
    },
    {
      headline: 'Probe Dell incumbency lightly.',
      body: 'Offer a side-by-side pilot on 1–2 stations. Low-friction ask.',
    },
  ],
  accountContext: [
    'Meridian is an independent regional health system with three hospitals and ~2.1M annual outpatient visits. In January they announced a **radiology AI partnership with Aidoc** for stroke and PE triage, and their 2025 capital plan earmarks spend for imaging infrastructure refresh. Current reading stations: aging Dell Precision towers on a 2020 refresh cycle.',
    'Informatics reports up through CMIO Dr. Rakesh Pillai — a public advocate for on-prem AI inference in clinical settings. Shortens the "why not cloud?" conversation.',
  ],
  whyDownloaded: [
    {
      tag: 'Signal',
      headline: 'Workstation-centric paper',
      body: "She's scoping hardware, not browsing AI content.",
    },
    {
      tag: 'Role',
      headline: 'Clinical + technical',
      body: 'Champion internally, defers to CMIO + CIO for purchase.',
    },
    {
      tag: 'Timing',
      headline: 'Q3 budget window',
      body: 'FY starts July. ~10 weeks to influence spec.',
    },
    {
      tag: 'Risk',
      headline: 'Dell incumbency',
      body: 'Real switching cost, but no structural software lock.',
    },
  ],
  signalDepth: {
    intro:
      'Not for daily seller use. This is the evidence layer — what Relay read from Marketo\'s raw stream, compared to what a D365-native agent would see. Useful when someone asks: "why did Relay conclude that?"',
    generic: {
      subhead: '~15 fields make it into Dataverse.',
      items: [
        { text: 'Score: 92' },
        { text: 'Source: paid search' },
        { text: 'Last activity: whitepaper' },
        { text: 'Campaign: HC-AI-Q2' },
      ],
    },
    relay: {
      subhead: 'Full unfiltered behavioral stream.',
      items: [
        {
          text: '**Visit sequence**: specs → Aidoc → PSREF, in order',
        },
        {
          text: '**Content affinity**: 7 of 9 pages on on-prem inference',
        },
        {
          text: '**Engagement rhythm**: opens cluster Tue/Thu AM',
        },
        {
          text: '**Form fill pattern**: skipped nurture, went to spec sheet',
        },
      ],
    },
  },
  sources: [
    { label: 'Marketo · Raw behavioral stream', kind: 'marketo' },
    { label: 'PSREF · ThinkStation P8/P5/P16', kind: 'lenovo' },
    { label: 'Lenovo Healthcare battle card', kind: 'lenovo' },
    { label: 'Aidoc ISV certification matrix', kind: 'lenovo' },
    { label: 'meridianhealth.org · Jan press', kind: 'public' },
    { label: 'Meridian FY25 capital filing', kind: 'public' },
    { label: 'LinkedIn · Dr. Okafor', kind: 'public' },
    { label: 'LinkedIn · Dr. R. Pillai, CMIO', kind: 'public' },
  ],
  sourcesCount: 13,
  quality: {
    duration: '1m 48s',
    sourcesCited: 13,
    confidence: 0.87,
    note:
      'All sources cited. Inference runs within Lenovo tenant. 30-day expiry on competitive context.',
  },
  dataSources: [
    { kind: 'marketo', label: 'Marketo · raw stream', sub: '9 behavioral events' },
    { kind: 'lenovo', label: 'PSREF', sub: '3 SKUs matched' },
    { kind: 'lenovo', label: 'Healthcare battle card', sub: 'Dell incumbency' },
    { kind: 'lenovo', label: 'ISV certification', sub: 'Aidoc on-prem' },
    { kind: 'public', label: 'Public web', sub: '4 sources' },
  ],
}

export const BRIEFINGS: Record<string, Briefing> = {
  meridian: MERIDIAN_BRIEFING,
}
