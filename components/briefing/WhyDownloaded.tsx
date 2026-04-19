import type { InsightCard } from '@/lib/types'

interface WhyDownloadedProps {
  cards: InsightCard[]
}

export function WhyDownloaded({ cards }: WhyDownloadedProps) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {cards.map((c) => (
        <div
          key={c.tag}
          className="rounded-md border border-d365-border bg-white px-[18px] py-4"
        >
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-lenovo-red">
            {c.tag}
          </div>
          <div className="mb-1 text-sm font-semibold tracking-[-0.01em] text-d365-ink">
            {c.headline}
          </div>
          <div className="text-[12.5px] leading-[1.55] text-d365-ink-2">
            {c.body}
          </div>
        </div>
      ))}
    </div>
  )
}
