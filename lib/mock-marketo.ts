import type { MarketoLead } from './types'

export const MOCK_MARKETO_LEADS: Record<string, MarketoLead> = {
  meridian: {
    id: 'meridian',
    identity: {
      name: 'Dr. Amelia Okafor',
      title: 'Director, Clinical Informatics',
      email: 'aokafor@meridianhealth.org',
      company: 'Meridian Health System',
      location: 'Columbus, OH',
    },
    score: 92,
    campaign_source: 'Paid search · Healthcare AI Q2 (HC-AI-Q2) · Google · "radiology workstation AI"',
    engagement_rhythm:
      'Opens cluster Tue/Thu AM (8–10 AM ET). 4 sessions in 6 days. Re-engages within 24h of asset download.',
    form_fills: [
      {
        form: 'Nurture intro — "5 questions for radiology leaders"',
        completed: false,
        skipped_fields: ['phone', 'team_size'],
      },
      {
        form: 'ThinkStation for Medical Imaging whitepaper · spec-sheet gate',
        completed: true,
      },
    ],
    behavioral_events: [
      {
        timestamp: '2026-04-14T08:52:00Z',
        event_type: 'page_view',
        asset: 'lenovo.com/healthcare/radiology — landing',
        duration_seconds: 42,
      },
      {
        timestamp: '2026-04-14T08:54:00Z',
        event_type: 'page_view',
        asset: 'ThinkStation P8 product page — specs tab',
        duration_seconds: 217,
      },
      {
        timestamp: '2026-04-14T08:58:00Z',
        event_type: 'page_view',
        asset: 'ThinkStation P5 product page — specs tab',
        duration_seconds: 163,
      },
      {
        timestamp: '2026-04-15T09:10:00Z',
        event_type: 'page_view',
        asset: 'Lenovo ISV certifications — Aidoc row',
        duration_seconds: 185,
      },
      {
        timestamp: '2026-04-15T09:14:00Z',
        event_type: 'download',
        asset: 'PSREF · ThinkStation P8 full datasheet (PDF)',
      },
      {
        timestamp: '2026-04-16T08:40:00Z',
        event_type: 'search',
        asset: 'site search: "on-prem AI inference"',
      },
      {
        timestamp: '2026-04-17T08:48:00Z',
        event_type: 'page_view',
        asset: 'Aidoc partnership announcement (blog)',
        duration_seconds: 241,
      },
      {
        timestamp: '2026-04-18T09:05:00Z',
        event_type: 'download',
        asset: '"ThinkStation for Medical Imaging" whitepaper',
      },
      {
        timestamp: '2026-04-20T08:32:00Z',
        event_type: 'page_view',
        asset: 'PSREF · ThinkStation P8 (return visit)',
        duration_seconds: 89,
      },
    ],
    account_notes:
      'Meridian Health System is an independent 3-hospital regional network in Columbus, OH (~2.1M annual outpatient visits). In Jan 2026 they announced a radiology AI partnership with Aidoc for stroke + PE triage. Current reading-room fleet is Dell Precision towers on a 2020 refresh cycle — no structural lock-in. Okafor reports up through CMIO Dr. Rakesh Pillai, a public advocate for on-prem AI inference (published on this in JAMIA, 2025). Meridian FY25 capital filing earmarks imaging-infrastructure refresh in Q3.',
    incumbent: 'Dell Precision',
    known_partner_stack: ['Aidoc (radiology AI)', 'Epic (EMR)', 'VMware (virtualization)'],
    budget_signal:
      'FY capital cycle starts July. Q3 capex window closes ~10 weeks. Imaging-infra refresh already line-itemed.',
    timeline_signal:
      'Behavior shifted from research to spec-comparison between Apr 14 and Apr 18. Currently in spec phase.',
    relevant_battle_cards: [
      'dell-precision-competitive',
      'aidoc-isv',
      'on-prem-vs-cloud-inference',
      'healthcare-capex-cycles',
    ],
  },

  westfield: {
    id: 'westfield',
    identity: {
      name: 'Ryan Chen',
      title: 'Director of IT',
      email: 'rchen@westfieldmedical.com',
      company: 'Westfield Medical Group',
      location: 'Indianapolis, IN',
    },
    score: 68,
    campaign_source:
      'Direct (return visitor) · originally inbound via search: "enterprise endpoint refresh TCO"',
    engagement_rhythm:
      'Business-hours sessions, split across two days. Re-engaged 2 days after first visit — classic IT-research pattern.',
    form_fills: [
      {
        form: '"Endpoint management for mid-size clinical networks" whitepaper gate',
        completed: true,
      },
      {
        form: 'TCO calculator — filled 180 seats, Dell Latitude incumbent, 4-year horizon',
        completed: true,
      },
    ],
    behavioral_events: [
      {
        timestamp: '2026-04-18T10:22:00Z',
        event_type: 'page_view',
        asset: 'lenovo.com/business/laptops — ThinkPad T14 productivity bundle',
        duration_seconds: 156,
      },
      {
        timestamp: '2026-04-18T10:26:00Z',
        event_type: 'page_view',
        asset: 'ThinkPad T14 Gen 5 — specs tab',
        duration_seconds: 201,
      },
      {
        timestamp: '2026-04-18T10:32:00Z',
        event_type: 'page_view',
        asset: 'Enterprise TCO calculator — interactive tool',
        duration_seconds: 338,
      },
      {
        timestamp: '2026-04-18T10:41:00Z',
        event_type: 'form_fill',
        asset: 'TCO calculator submission (180 seats, Latitude incumbent)',
      },
      {
        timestamp: '2026-04-18T10:45:00Z',
        event_type: 'download',
        asset: '"Endpoint management for mid-size clinical networks" whitepaper',
      },
      {
        timestamp: '2026-04-20T09:08:00Z',
        event_type: 'page_view',
        asset: 'ThinkPad T14 Gen 5 product page (return visit)',
        duration_seconds: 98,
      },
      {
        timestamp: '2026-04-20T09:11:00Z',
        event_type: 'page_view',
        asset: 'ThinkPad T14s Gen 4 product page',
        duration_seconds: 142,
      },
      {
        timestamp: '2026-04-20T09:15:00Z',
        event_type: 'page_view',
        asset: 'Volume pricing / quotes landing page',
        duration_seconds: 87,
      },
      {
        timestamp: '2026-04-20T09:18:00Z',
        event_type: 'page_view',
        asset: 'ThinkShield endpoint management overview',
        duration_seconds: 164,
      },
    ],
    account_notes:
      'Westfield Medical Group is a physician-owned primary-care and specialty network: 5 locations across greater Indianapolis, 180 clinical staff total. Incumbent endpoint fleet is Dell Latitude 5000 series, approaching 4 years in service, with manufacturer warranty expiring in 6 months — a hard forcing function. Decision maker is CIO Sarah Lin; Ryan Chen (Director of IT) owns vendor evaluation and the RFP process. No known ties to Dell beyond the current fleet. Budget envelope is ~$180K per the TCO calculator inputs (180 seats × ~$1K effective device cost).',
    incumbent: 'Dell Latitude 5000 series (~4 years old, warranty expiring 6 months)',
    known_partner_stack: ['Epic (EMR)', 'Microsoft 365', 'Cisco (networking)'],
    budget_signal:
      '~$180K budget envelope inferred from TCO calculator (180 seats). Not yet in capex cycle — procurement driven by warranty expiry.',
    timeline_signal:
      'Warranty expires in 6 months. Behavior shows return visit pattern — active vendor evaluation, likely building a short list.',
    relevant_battle_cards: [
      'dell-latitude-competitive',
      'volume-endpoint-refresh',
      'healthcare-capex-cycles',
    ],
  },

  lakeshore: {
    id: 'lakeshore',
    identity: {
      name: 'Dr. Sarah Chen',
      title: 'VP Clinical Operations',
      email: 'schen@lakeshoreregional.org',
      company: 'Lakeshore Regional Medical',
      location: 'Evanston, IL',
    },
    score: 88,
    campaign_source:
      'Organic · LinkedIn share of "Mammography AI at scale" case study · inbound from partner co-marketing',
    engagement_rhythm:
      'Evening sessions (7–9 PM CT). 3 sessions in 4 days. Long dwell time on case studies (avg 4 min).',
    form_fills: [
      {
        form: '"Mammography AI at scale" case study gate',
        completed: true,
      },
      {
        form: 'Clinical-ops AI deployment checklist (gated)',
        completed: true,
      },
    ],
    behavioral_events: [
      {
        timestamp: '2026-04-17T19:22:00Z',
        event_type: 'download',
        asset: '"Mammography AI at scale" customer case study',
      },
      {
        timestamp: '2026-04-17T19:38:00Z',
        event_type: 'page_view',
        asset: 'Lenovo healthcare — mammography workstation landing',
        duration_seconds: 264,
      },
      {
        timestamp: '2026-04-18T20:04:00Z',
        event_type: 'page_view',
        asset: 'ThinkStation P5 product page',
        duration_seconds: 198,
      },
      {
        timestamp: '2026-04-18T20:11:00Z',
        event_type: 'page_view',
        asset: 'ThinkStation P3 product page',
        duration_seconds: 121,
      },
      {
        timestamp: '2026-04-19T19:47:00Z',
        event_type: 'download',
        asset: 'Clinical-ops AI deployment checklist',
      },
      {
        timestamp: '2026-04-19T20:02:00Z',
        event_type: 'page_view',
        asset: 'Lenovo ISV certifications — iCAD row',
        duration_seconds: 143,
      },
      {
        timestamp: '2026-04-20T07:14:00Z',
        event_type: 'email_open',
        asset: 'Nurture email · "Deploying AI across a 3-hospital network"',
      },
      {
        timestamp: '2026-04-20T08:12:00Z',
        event_type: 'page_view',
        asset: 'Volpara ISV compatibility page',
        duration_seconds: 178,
      },
    ],
    account_notes:
      'Lakeshore Regional Medical is a 3-hospital network in the Chicago north-shore area (Evanston, Skokie, Glenview). They have an approved capital budget for a mammography AI triage pilot — Q2 2026 close, 6-month rollout. Dr. Chen owns clinical-operations strategy; she partners closely with Dr. Marcus Whitley (Chief Radiologist) on imaging-workflow decisions. Incumbent workstation fleet: HP Z-series (Z4/Z6) on a 2021 refresh cycle, roughly halfway through expected life — meaning there is a budget fight to win, not a scheduled refresh. Partner ecosystem they\'re evaluating: iCAD ProFound AI and Volpara for density/risk.',
    incumbent: 'HP Z-series (Z4/Z6)',
    known_partner_stack: ['iCAD (mammography AI)', 'Volpara (density/risk)', 'Epic (EMR)'],
    budget_signal:
      'Capital approved. Q2 2026 close target. 6-month pilot rollout. Not part of scheduled refresh — requires displacing HP mid-cycle.',
    timeline_signal:
      'Researching actively but not yet at spec comparison. Case-study-heavy behavior = still building internal business case.',
    relevant_battle_cards: [
      'hp-zseries-competitive',
      'icad-volpara-isv',
      'on-prem-vs-cloud-inference',
      'healthcare-capex-cycles',
    ],
  },
}

export type MockLeadId = keyof typeof MOCK_MARKETO_LEADS

export function isKnownLeadId(id: string): id is MockLeadId {
  return id in MOCK_MARKETO_LEADS
}
