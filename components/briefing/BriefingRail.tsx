import type { Briefing, DataSourceSummary, Lead } from '@/lib/types'

interface BriefingRailProps {
  lead: Lead
  briefing: Briefing | null
}

const iconCls: Record<DataSourceSummary['kind'], string> = {
  marketo: 'bg-marketo-purple',
  lenovo: 'bg-lenovo-red',
  public: 'bg-[#6B7280]',
}

const iconLetter: Record<DataSourceSummary['kind'], string> = {
  marketo: 'M',
  lenovo: 'L',
  public: 'W',
}

const pulseStyle = {
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
}

export function BriefingRail({ lead, briefing }: BriefingRailProps) {
  return (
    <div className="flex flex-col gap-6 overflow-y-auto border-l border-d365-border bg-white px-7 py-8">
      {/* Lead card — renders from 0ms via leadFromLeadId lookup */}
      <div className="border-b border-d365-border pb-5">
        <h4 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-d365-ink-3 [font-family:var(--font-serif)]">
          Lead
        </h4>
        <div className="rounded-md bg-paper-warm px-4 py-3.5">
          <div className="serif text-base font-medium tracking-[-0.01em] text-d365-ink">
            {lead.name}
          </div>
          <div className="mt-0.5 text-xs text-d365-ink-2">{lead.role}</div>
          <div className="mt-2 border-t border-d365-border pt-2 text-xs font-medium text-d365-ink">
            {lead.company}
            {lead.location && ` · ${lead.location}`}
          </div>
        </div>
      </div>

      {briefing ? (
        <BriefingRailEvidence briefing={briefing} />
      ) : (
        <BriefingRailEvidenceSkeleton />
      )}
    </div>
  )
}

function BriefingRailEvidence({ briefing }: { briefing: Briefing }) {
  const { dataSources, quality } = briefing

  return (
    <>
      <div className="border-b border-d365-border pb-5">
        <h4 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-d365-ink-3 [font-family:var(--font-serif)]">
          What Relay read
        </h4>
        {dataSources.map((ds, i) => (
          <div
            key={i}
            className={`grid grid-cols-[16px_1fr] items-start gap-2.5 py-1.5 text-[11.5px] ${
              i < dataSources.length - 1
                ? 'border-b border-dashed border-d365-border'
                : ''
            }`}
          >
            <div
              className={`mt-px grid h-4 w-4 place-items-center rounded-[3px] text-[9px] font-bold text-white [font-family:var(--font-serif)] ${iconCls[ds.kind]}`}
            >
              {iconLetter[ds.kind]}
            </div>
            <div>
              <div className="font-medium text-d365-ink">{ds.label}</div>
              <div className="mono mt-px text-[10.5px] text-d365-ink-3">
                {ds.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-d365-ink-3 [font-family:var(--font-serif)]">
          Quality
        </h4>
        <div className="mb-2 text-[12.5px] leading-[1.5] text-d365-ink">
          <strong className="serif text-sm font-medium tracking-[-0.01em]">
            {quality.duration}
          </strong>{' '}
          · {quality.sourcesCited} sources · confidence{' '}
          {quality.confidence.toFixed(2)}
        </div>
        <div className="text-[11px] leading-[1.55] text-d365-ink-2">
          {quality.note}
        </div>
      </div>
    </>
  )
}

function BriefingRailEvidenceSkeleton() {
  return (
    <>
      <div className="border-b border-d365-border pb-5">
        <h4 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-d365-ink-3 [font-family:var(--font-serif)]">
          What Relay read
        </h4>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`grid grid-cols-[16px_1fr] items-start gap-2.5 py-1.5 ${
              i < 4 ? 'border-b border-dashed border-d365-border' : ''
            }`}
          >
            <div
              className="mt-px h-4 w-4 rounded-[3px] bg-d365-border"
              style={pulseStyle}
            />
            <div>
              <div
                className="h-[10px] w-[70%] rounded-sm bg-d365-border"
                style={pulseStyle}
              />
              <div
                className="mt-1 h-[8px] w-[45%] rounded-sm bg-d365-border"
                style={pulseStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-d365-ink-3 [font-family:var(--font-serif)]">
          Quality
        </h4>
        <div
          className="mb-2 h-[12px] w-[80%] rounded-sm bg-d365-border"
          style={pulseStyle}
        />
        <div
          className="h-[8px] w-[95%] rounded-sm bg-d365-border"
          style={pulseStyle}
        />
        <div
          className="mt-1 h-[8px] w-[70%] rounded-sm bg-d365-border"
          style={pulseStyle}
        />
      </div>
    </>
  )
}
