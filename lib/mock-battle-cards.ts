import type { BattleCard } from './types'

export const MOCK_BATTLE_CARDS: Record<string, BattleCard> = {
  'dell-precision-competitive': {
    topic: 'dell-precision-competitive',
    title: 'Competing vs. Dell Precision (incumbent)',
    key_points: [
      'Dell Precision is the default incumbent in US radiology reading rooms (~55% share).',
      'There is no structural software lock-in — PACS/viewer vendors are hardware-agnostic.',
      'Switching cost is operational (IT re-imaging, procurement change) not technical.',
      'Lenovo wins on ISV certification breadth for clinical AI, and on Threadripper PRO for on-prem inference workloads.',
    ],
    talking_points: [
      'Offer a side-by-side pilot on 1–2 reading stations — low-friction ask that respects the existing Dell relationship.',
      'Ask whether inference latency shows up in the radiologist\'s workflow. Let them surface the pain before pitching.',
      'If Dell is on a refresh cycle, align the Lenovo proposal with their procurement calendar, not against it.',
    ],
    proof_points: [
      'ThinkStation P8 certified on more medical-imaging ISVs than the equivalent Dell Precision 7960.',
      'Case study: 3-hospital system migrated 24 reading stations from Precision to P8 — cited on-prem AI inference performance as the deciding factor.',
    ],
  },

  'hp-zseries-competitive': {
    topic: 'hp-zseries-competitive',
    title: 'Competing vs. HP Z-series (incumbent)',
    key_points: [
      'HP Z4/Z6 are common in mid-size health systems that favor HP\'s printer+PC bundled procurement.',
      'Z-series is weaker than Precision/ThinkStation on GPU options for heavy AI inference — HP\'s highest GPU offering lags by a generation.',
      'Mid-cycle displacement requires a clear TCO or capability argument — it\'s harder than winning a scheduled refresh.',
    ],
    talking_points: [
      'Anchor the conversation on the AI pilot, not the workstation. Frame it as "does your current fleet have headroom for this workload?"',
      'Position the Lenovo buy as AI-pilot-scoped, not a full fleet refresh. Smaller ask, easier yes.',
      'Bring the ISV certification matrix — HP\'s gap is real and easy to show.',
    ],
    proof_points: [
      'ThinkStation P5 is certified for both iCAD ProFound AI and Volpara; HP Z4 G5 is certified for neither as of Q1 2026.',
      'Peer case study: mid-size IDN that ran a pilot on P5 for mammography AI, then expanded to all reading stations over 18 months.',
    ],
  },

  'aidoc-isv': {
    topic: 'aidoc-isv',
    title: 'Aidoc ISV partnership · radiology AI',
    key_points: [
      'Aidoc is a leading clinical AI vendor for emergent radiology findings (stroke, PE, C-spine, ICH).',
      'Aidoc deployments can run cloud or on-prem; on-prem is preferred in systems with strict data-residency or latency requirements.',
      'ThinkStation P8 and P5 are both formally Aidoc-certified. Precision 7960 is certified; Z-series is not.',
    ],
    talking_points: [
      'When Aidoc comes up, pivot from "which workstation" to "what does your deployment architecture look like" — Aidoc on-prem changes the spec math.',
      'If the health system\'s CMIO is a public on-prem advocate, that closes the cloud-vs-on-prem debate before it starts.',
    ],
    proof_points: [
      'Joint Lenovo-Aidoc reference architecture published Q4 2025.',
      'Listed on Aidoc partner page as a certified workstation provider.',
    ],
  },

  'icad-volpara-isv': {
    topic: 'icad-volpara-isv',
    title: 'iCAD + Volpara ISV partnerships · mammography AI',
    key_points: [
      'iCAD ProFound AI is the leading FDA-cleared AI triage for mammography.',
      'Volpara handles breast-density assessment and risk stratification — complementary, not competitive.',
      'Most mammography AI deployments pair the two; workstation needs to be certified for both.',
      'ThinkStation P5 and P3 are certified for both iCAD and Volpara. HP Z4 is not certified for either.',
    ],
    talking_points: [
      'Mammography AI triage generally does not need on-prem inference — cloud is common and acceptable. Don\'t over-sell the P8 here.',
      'P5 is almost always the right answer for mammography reading stations. P3 works for clinical-ops review.',
      'Ask about radiologist reading volume per day — that\'s the spec driver, not total hospital size.',
    ],
    proof_points: [
      'iCAD partner architecture guide explicitly cites ThinkStation P5 as a reference workstation.',
      'Volpara co-marketing materials include Lenovo as a preferred hardware partner.',
    ],
  },

  'on-prem-vs-cloud-inference': {
    topic: 'on-prem-vs-cloud-inference',
    title: 'On-prem vs. cloud AI inference in clinical settings',
    key_points: [
      'Clinical AI inference can run in the cloud (vendor-hosted) or on-prem (customer-hosted on workstations or servers).',
      'Drivers for on-prem: data-residency, network-reliability risk, PHI concerns, latency-critical workflows (emergent triage).',
      'Drivers for cloud: lower hardware capex, faster vendor updates, simpler IT.',
      'The choice is usually set by the CMIO and radiology leadership before the hardware conversation starts.',
    ],
    talking_points: [
      'Find out which side of the fence they\'re on before pitching. Pushing P8 at a cloud-first buyer is wasted air.',
      'If on-prem: Threadripper PRO + RTX 6000 Ada (P8) is the story. If cloud: lighter workstation (P5/P3) is appropriate.',
    ],
    proof_points: [
      'Published CMIO commentary (JAMIA, 2025) making the case for on-prem inference in emergent-care workflows.',
    ],
  },

  'healthcare-capex-cycles': {
    topic: 'healthcare-capex-cycles',
    title: 'Healthcare capex cycles · timing',
    key_points: [
      'Most US health systems run fiscal year July–June. Q3 capex window (Jul–Sep) is the biggest spend quarter.',
      'Capital line items are locked 8–12 weeks before the fiscal year starts. If you\'re not in the FY plan, you\'re waiting a year.',
      'Capex approvals flow CIO → CFO → Board (for large items). CMIO influences radiology-specific line items.',
      'Pilot-scoped buys can often be funded from an AI-specific innovation budget, bypassing the main capex cycle.',
    ],
    talking_points: [
      'Ask what their FY looks like and when line items close. Non-negotiable constraint.',
      'If you\'re late to the FY plan, pivot to "can we do a pilot out of innovation budget?" — that can often move on a 4-6 week timeline.',
    ],
    proof_points: [
      'Benchmark: health-system capex decisions average 14 weeks from first conversation to PO.',
    ],
  },
}

export function battleCardsForLead(topics: string[]): BattleCard[] {
  return topics
    .map((t) => MOCK_BATTLE_CARDS[t])
    .filter((card): card is BattleCard => card !== undefined)
}
