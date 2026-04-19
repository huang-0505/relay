import type { Source } from '@/lib/types'

interface SourcesBlockProps {
  sources: Source[]
  count: number
}

const chipCls: Record<Source['kind'], string> = {
  marketo:
    'bg-marketo-purple-light text-marketo-purple border-marketo-purple/20 font-semibold',
  lenovo:
    'bg-lenovo-red-soft text-lenovo-red border-lenovo-red/20 font-semibold',
  public: 'bg-white text-d365-ink-2 border-d365-border',
}

export function SourcesBlock({ sources, count }: SourcesBlockProps) {
  return (
    <div className="mt-6 border-t border-d365-border pt-6">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-d365-ink-3 [font-family:var(--font-serif)]">
        Sources · {count} total
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((s) => (
          <span
            key={s.label}
            className={`mono rounded-[3px] border px-2.5 py-1.5 text-[11px] ${chipCls[s.kind]}`}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
