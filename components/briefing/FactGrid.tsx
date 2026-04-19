import type { FactBox } from '@/lib/types'

interface FactGridProps {
  facts: FactBox[]
}

export function FactGrid({ facts }: FactGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {facts.map((f) => (
        <div
          key={f.label}
          className="rounded-md border border-d365-border bg-white px-3.5 py-3"
        >
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-lenovo-red">
            {f.label}
          </div>
          <div className="mb-[3px] text-[13px] font-semibold leading-[1.3] tracking-[-0.01em] text-d365-ink">
            {f.value}
          </div>
          <div className="text-[11px] italic leading-[1.4] text-d365-ink-2">
            {f.note}
          </div>
        </div>
      ))}
    </div>
  )
}
