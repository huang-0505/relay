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
    briefingId: 'westfield',
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

export const LAKESHORE_BRIEFING: Briefing = {
  id: 'lakeshore',
  generatedMinutesAgo: 0,
  breadcrumb: 'Lakeshore Regional Medical · AI Imaging Pilot',
  headline:
    "Dr. Chen is scoping workstations for a funded mammography AI pilot. Budget approved, Q2 close — HP incumbency is mid-cycle, not scheduled refresh.",
  lead: {
    name: 'Dr. Sarah Chen',
    role: 'VP Clinical Operations',
    company: 'Lakeshore Regional Medical',
    location: 'Evanston, IL',
  },
  summary:
    "Dr. Sarah Chen runs clinical operations at **Lakeshore Regional Medical** — a three-hospital network in the Chicago north-shore area (Evanston, Skokie, Glenview). She owns the business case for a funded **mammography AI triage pilot** targeting a Q2 2026 close and a six-month rollout. Her behavior this week is case-study-heavy, not spec-comparison yet — she's still building the internal argument. The incumbent fleet is **HP Z-series (Z4/Z6)** on a 2021 refresh cycle, which means a win requires displacing HP mid-cycle rather than riding a scheduled refresh.",
  mqlTrigger: {
    score: 88,
    description:
      'Triggered by **"Mammography AI at scale" case study** download · organic LinkedIn inbound · healthcare partner co-marketing',
  },
  facts: [
    {
      label: 'Role',
      value: 'Owner of the pilot business case',
      note: 'partners with Chief Radiologist on imaging workflow',
    },
    {
      label: 'Urgency',
      value: 'Q2 2026 close',
      note: 'capital approved, 6-month rollout',
    },
    {
      label: 'Intent',
      value: 'Case-study research, pre-spec',
      note: 'building internal case, not comparing SKUs yet',
    },
    {
      label: 'Competition',
      value: 'HP Z-series (incumbent)',
      note: 'mid-cycle displacement, real switch fight',
    },
  ],
  productsTag: 'Lenovo · PSREF + ISV Matrix',
  products: [
    {
      name: 'ThinkStation P5',
      why:
        'Xeon W · RTX A4000/A5000. Certified for both iCAD ProFound AI and Volpara — the two ISVs she is evaluating. HP Z4 G5 is certified for neither.',
      fit: 0.9,
      topPick: true,
    },
    {
      name: 'ThinkStation P3 Tower',
      why:
        'Entry workstation for clinical-ops review and density/risk (Volpara) stations. Lower price-point option for the non-primary reading seats in a phased rollout.',
      fit: 0.72,
    },
    {
      name: 'ThinkPad P16',
      why:
        'Mobile workstation option for radiologists who also read remotely. Mention only if teleradiology comes up.',
      fit: 0.48,
    },
  ],
  talkPoints: [
    {
      headline: 'Anchor on the AI pilot, not the workstation.',
      body:
        "Ask whether the current Z-series fleet has headroom for iCAD + Volpara workloads. Let her surface the gap — don't pitch a replacement upfront.",
    },
    {
      headline: 'Frame the buy as pilot-scoped, not fleet refresh.',
      body:
        "Mid-cycle displacement is a harder sell than a refresh. Scoping to pilot stations first (5–8 seats) is a more winnable ask and keeps HP's fleet out of the fight.",
    },
    {
      headline: 'Bring the ISV certification matrix.',
      body:
        "HP Z4 G5 is certified for neither iCAD nor Volpara as of Q1 2026. That's a real, demonstrable gap — bring the matrix, don't just claim it.",
    },
  ],
  accountContext: [
    'Lakeshore Regional is a three-hospital network (Evanston, Skokie, Glenview) with an approved capital budget for a **mammography AI triage pilot**. Target close is Q2 2026 with a six-month rollout across the three sites. The partner stack under evaluation is **iCAD ProFound AI** for triage and **Volpara** for density/risk — standard pairing for modern mammography AI deployments.',
    'Dr. Chen owns clinical-operations strategy; she partners closely with Dr. Marcus Whitley (Chief Radiologist) on imaging-workflow decisions. The incumbent workstation fleet is HP Z-series, roughly halfway through its expected refresh cycle — meaning this is a mid-cycle displacement fight, not a scheduled refresh. Winning here means making the AI-pilot capability gap more important than the disruption of a partial fleet swap.',
  ],
  whyDownloaded: [
    {
      tag: 'Signal',
      headline: 'Case-study-heavy browsing',
      body: 'Still building the internal business case — not at spec comparison yet.',
    },
    {
      tag: 'Role',
      headline: 'Clinical-ops owner',
      body: 'Owns the pilot business case end-to-end; pairs with the Chief Radiologist on workflow.',
    },
    {
      tag: 'Timing',
      headline: 'Q2 close, capital approved',
      body: 'Six-month rollout window. Budget no longer the blocker.',
    },
    {
      tag: 'Risk',
      headline: 'HP mid-cycle fleet',
      body: 'Displacement is harder than refresh — needs a capability wedge, not price.',
    },
  ],
  signalDepth: {
    intro:
      'Not for daily seller use. This is the evidence layer — what Relay read from Marketo\'s raw stream, compared to what a D365-native agent would see.',
    generic: {
      subhead: '~15 fields make it into Dataverse.',
      items: [
        { text: 'Score: 88' },
        { text: 'Source: organic / LinkedIn' },
        { text: 'Last activity: case study download' },
        { text: 'Campaign: partner co-marketing' },
      ],
    },
    relay: {
      subhead: 'Full unfiltered behavioral stream.',
      items: [
        {
          text:
            '**Visit sequence**: case study → P5 → P3 → iCAD ISV row → Volpara compat',
        },
        {
          text: '**Content affinity**: case studies > specs (4:1 by dwell time)',
        },
        {
          text: '**Engagement rhythm**: evenings (7–9 PM CT), not business hours',
        },
        {
          text: '**Form fill pattern**: completed both gated forms — serious buyer',
        },
      ],
    },
  },
  sources: [
    { label: 'Marketo · Raw behavioral stream', kind: 'marketo' },
    { label: 'PSREF · ThinkStation P5/P3/P16', kind: 'lenovo' },
    { label: 'Lenovo Healthcare battle card · HP Z-series', kind: 'lenovo' },
    { label: 'iCAD ISV certification matrix', kind: 'lenovo' },
    { label: 'Volpara ISV certification matrix', kind: 'lenovo' },
    { label: 'lakeshoreregional.org · services page', kind: 'public' },
    { label: 'LinkedIn · Dr. Sarah Chen', kind: 'public' },
    { label: 'LinkedIn · Dr. Marcus Whitley, Chief Radiologist', kind: 'public' },
  ],
  sourcesCount: 11,
  quality: {
    duration: '1m 48s',
    sourcesCited: 11,
    confidence: 0.85,
    note:
      'All sources cited. Inference runs within Lenovo tenant. 30-day expiry on competitive context.',
  },
  dataSources: [
    { kind: 'marketo', label: 'Marketo · raw stream', sub: '8 behavioral events' },
    { kind: 'lenovo', label: 'PSREF', sub: '3 SKUs matched' },
    { kind: 'lenovo', label: 'Healthcare battle card', sub: 'HP incumbency' },
    { kind: 'lenovo', label: 'ISV certification', sub: 'iCAD + Volpara' },
    { kind: 'public', label: 'Public web', sub: '3 sources' },
  ],
}

export const WESTFIELD_BRIEFING: Briefing = {
  id: 'westfield',
  generatedMinutesAgo: 0,
  breadcrumb: 'Westfield Medical Group · Endpoint Refresh',
  headline:
    "Ryan Chen is short-listing vendors for a 180-seat endpoint refresh. Dell Latitude warranty expires in 6 months — forced timing, not strategic.",
  lead: {
    name: 'Ryan Chen',
    role: 'Director of IT',
    company: 'Westfield Medical Group',
    location: 'Indianapolis, IN',
  },
  summary:
    "**Ryan Chen** owns vendor evaluation for a 180-seat endpoint refresh across **Westfield Medical Group**'s 5 Indianapolis clinics. His **Dell Latitude** fleet hits end-of-warranty in six months, forcing the refresh. CIO **Sarah Lin** is the decision maker; Ryan's job is to hand her a short list backed by a TCO model.",
  mqlTrigger: {
    score: 68,
    description:
      'Triggered by **ThinkPad T14 productivity bundle** return visit + **TCO calculator** completion · organic search entry',
  },
  facts: [
    {
      label: 'Role',
      value: 'Evaluator, not final approver',
      note: 'CIO Sarah Lin signs',
    },
    {
      label: 'Urgency',
      value: '~6 months',
      note: 'Dell Latitude warranty expiry',
    },
    {
      label: 'Intent',
      value: 'Vendor shortlist, TCO-driven',
      note: 'already ran our calculator',
    },
    {
      label: 'Competition',
      value: 'Dell Latitude (incumbent)',
      note: 'no structural lock-in',
    },
  ],
  productsTag: 'Lenovo · PSREF + Volume Playbook',
  products: [
    {
      name: 'ThinkPad T14 Gen 5',
      why:
        "vPro + ThinkShield + 4-year warranty — direct fit for a 180-seat mid-market clinical fleet. Strongest 3-year TCO vs. Latitude on our published model.",
      fit: 0.91,
      topPick: true,
    },
    {
      name: 'ThinkPad T14s Gen 4',
      why:
        'Same-family thin-and-light for 20–30 roaming clinical staff who carry the device all day. Mix into the T14 deal as a secondary SKU.',
      fit: 0.83,
    },
    {
      name: 'ThinkPad E15',
      why:
        'Value option for admin / non-clinical knowledge workers where T14 is over-specced. Use to hit the 250-seat volume tier if scope expands.',
      fit: 0.72,
    },
  ],
  talkPoints: [
    {
      headline: 'Open on TCO, not device specs.',
      body:
        "He already ran our calculator — ask what his model shows and match yours to the line items he cares about.",
    },
    {
      headline: 'Anchor on warranty expiry, not product preference.',
      body:
        'Six months from a forced refresh is the real urgency. Specs and brand loyalty come second — timing is the wedge.',
    },
    {
      headline: 'Offer a phased pilot to de-risk the switch.',
      body:
        '30-40 seats in month 1, rest over 90 days. Lowest-risk path to a full-fleet win; lets him show the CIO proof before committing the full $180K.',
    },
  ],
  accountContext: [
    'Westfield Medical Group is a **physician-owned primary-care and specialty network** — 5 Indianapolis clinics, 180 clinical staff, running Epic and Microsoft 365. CIO **Sarah Lin** is the sign-off; Ryan owns vendor evaluation and the RFP. There is no known Dell strategic relationship beyond the installed Latitude fleet, so framing this as "consolidating the contract" is softer than "switching vendors."',
  ],
  whyDownloaded: [
    {
      tag: 'Signal',
      headline: 'TCO calculator completion',
      body: 'Filled with 180 seats + Latitude incumbent — he is modeling the buy, not browsing.',
    },
    {
      tag: 'Timing',
      headline: 'Return visit after 2 days',
      body: 'Classic IT-research pattern — evaluated once, came back to compare specific SKUs.',
    },
    {
      tag: 'Risk',
      headline: 'Dell incumbency + 8+ years',
      body: 'Frame as contract consolidation, not switch. Lowers political friction for Ryan.',
    },
  ],
  signalDepth: {
    intro:
      'Not for daily seller use. Evidence layer comparing what Relay read against a D365-native view.',
    generic: {
      subhead: '~15 fields make it into Dataverse.',
      items: [
        { text: 'Score: 68' },
        { text: 'Source: direct / return visitor' },
        { text: 'Last activity: volume pricing page' },
      ],
    },
    relay: {
      subhead: 'Full unfiltered behavioral stream.',
      items: [
        {
          text:
            '**Visit sequence**: T14 bundle → TCO calc → whitepaper → T14s → volume pricing → ThinkShield',
        },
        {
          text:
            '**TCO inputs**: 180 seats · Latitude incumbent · 4-year horizon · he built the model',
        },
        {
          text:
            '**Engagement rhythm**: two return sessions, both in business hours, 2 days apart',
        },
      ],
    },
  },
  sources: [
    { label: 'Marketo · Raw behavioral stream', kind: 'marketo' },
    { label: 'PSREF · ThinkPad T14, T14s, E15', kind: 'lenovo' },
    { label: 'Lenovo 3-yr TCO model · T14 vs Latitude', kind: 'lenovo' },
    { label: 'Volume-refresh playbook · 180-seat tier', kind: 'lenovo' },
    { label: 'TCO calculator inputs (submitted by lead)', kind: 'marketo' },
    { label: 'westfieldmedical.com · locations page', kind: 'public' },
    { label: 'LinkedIn · Ryan Chen, Director of IT', kind: 'public' },
    { label: 'LinkedIn · Sarah Lin, CIO', kind: 'public' },
  ],
  sourcesCount: 11,
  quality: {
    duration: '1m 48s',
    sourcesCited: 11,
    confidence: 0.89,
    note:
      'All sources cited. Inference runs within Lenovo tenant. 30-day expiry on competitive context.',
  },
  dataSources: [
    { kind: 'marketo', label: 'Marketo · raw stream', sub: '9 behavioral events' },
    { kind: 'lenovo', label: 'PSREF', sub: '3 SKUs matched' },
    { kind: 'lenovo', label: 'TCO model', sub: 'T14 vs Latitude' },
    { kind: 'lenovo', label: 'Volume playbook', sub: '180-seat tier' },
    { kind: 'public', label: 'Public web', sub: '3 sources' },
  ],
}

export const BRIEFINGS: Record<string, Briefing> = {
  meridian: MERIDIAN_BRIEFING,
  lakeshore: LAKESHORE_BRIEFING,
  westfield: WESTFIELD_BRIEFING,
}
