import type { Briefing } from '@/lib/types'
import { FactGrid } from './FactGrid'
import { MqlTriggerBand } from './MqlTriggerBand'
import { RichText } from './RichText'

interface LeadSummaryProps {
  briefing: Briefing
}

export function LeadSummary({ briefing }: LeadSummaryProps) {
  return (
    <div className="mb-9">
      <div className="mb-3.5 border-b border-d365-border pb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-d365-ink-2 [font-family:var(--font-serif)]">
        Lead summary
      </div>
      <p className="mb-[18px] text-[14.5px] leading-[1.7] text-d365-ink">
        <RichText text={briefing.summary} />
      </p>
      <MqlTriggerBand trigger={briefing.mqlTrigger} />
      <FactGrid facts={briefing.facts} />
    </div>
  )
}
