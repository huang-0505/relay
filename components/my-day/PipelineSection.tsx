import { PIPELINE_OPPORTUNITIES } from '@/lib/mock-data'
import { OpportunityCard } from './OpportunityCard'

export function PipelineSection() {
  return (
    <div className="px-10 pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="serif text-[19px] font-medium tracking-[-0.01em] text-d365-ink">
          Rest of pipeline{' '}
          <span className="mono ml-2 text-xs text-d365-ink-3">20 items</span>
        </h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {PIPELINE_OPPORTUNITIES.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>
    </div>
  )
}
