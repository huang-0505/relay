import type { MqlTrigger } from '@/lib/types'
import { RichText } from './RichText'

interface MqlTriggerBandProps {
  trigger: MqlTrigger
}

export function MqlTriggerBand({ trigger }: MqlTriggerBandProps) {
  return (
    <div className="relative mb-4 flex items-center gap-4 overflow-hidden rounded-md border border-marketo-border bg-[linear-gradient(90deg,var(--color-marketo-purple-light)_0%,#F8F5FD_100%)] px-[18px] py-3">
      <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-marketo-purple" />
      <div className="flex-shrink-0 whitespace-nowrap border-r border-marketo-purple/20 pr-3.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-marketo-purple-dark">
        MQL · Score {trigger.score}
      </div>
      <div className="text-[13px] leading-[1.5] text-d365-ink">
        <RichText text={trigger.description} />
      </div>
    </div>
  )
}
