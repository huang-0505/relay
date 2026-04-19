import type { TalkPoint } from '@/lib/types'

interface TalkPointsProps {
  points: TalkPoint[]
}

export function TalkPoints({ points }: TalkPointsProps) {
  return (
    <div className="mt-3 flex flex-col gap-3">
      {points.map((p, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-md border border-d365-border bg-white px-[18px] py-4 text-[13.5px] leading-[1.6]"
        >
          <div className="serif flex-shrink-0 text-[24px] font-medium italic leading-none text-lenovo-red">
            {i + 1}.
          </div>
          <div>
            <strong className="font-semibold text-d365-ink">
              {p.headline}
            </strong>{' '}
            {p.body}
          </div>
        </div>
      ))}
    </div>
  )
}
