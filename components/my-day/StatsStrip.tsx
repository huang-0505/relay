import { STATS } from '@/lib/mock-data'

export function StatsStrip() {
  return (
    <div className="grid grid-cols-4 gap-10 border-b border-d365-border bg-white px-10 py-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-0.5">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-d365-ink-3">
            {s.label}
          </div>
          <div className="serif text-[26px] font-medium leading-[1.1] tracking-[-0.02em] text-d365-ink">
            {s.value}
            {s.unit && (
              <span className="ml-0.5 text-sm text-d365-ink-3">{s.unit}</span>
            )}
          </div>
          <div
            className={`text-[11px] font-medium ${
              s.deltaTone === 'negative'
                ? 'text-accent-amber'
                : 'text-accent-green'
            }`}
          >
            {s.delta}
          </div>
        </div>
      ))}
    </div>
  )
}
