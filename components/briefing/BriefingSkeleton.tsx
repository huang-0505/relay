'use client'

import { useEffect, useState } from 'react'

interface BriefingSkeletonProps {
  startedAt: number
}

// Pseudo-progress: 0 → 80% over ~6s with ease-out, then hold at 80% until
// the real response arrives (the component unmounts on resolve).
function progressAt(elapsedMs: number): number {
  const target = 6000
  if (elapsedMs >= target) return 80
  const t = elapsedMs / target
  const eased = 1 - Math.pow(1 - t, 2)
  return eased * 80
}

export function BriefingSkeleton({ startedAt }: BriefingSkeletonProps) {
  const [elapsedMs, setElapsedMs] = useState(() => Date.now() - startedAt)

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 100)
    return () => clearInterval(id)
  }, [startedAt])

  const seconds = Math.floor(elapsedMs / 1000)
  const tenths = Math.floor((elapsedMs % 1000) / 100)
  const pct = progressAt(elapsedMs)

  return (
    <div className="flex flex-1 items-center justify-center overflow-hidden">
      <div className="flex w-[420px] flex-col items-center gap-6 px-6 text-center">
        <div
          className="grid h-16 w-16 place-items-center rounded-lg bg-lenovo-ink font-serif text-[36px] font-bold text-white"
          style={{ animation: 'relay-spin 1.2s linear infinite' }}
        >
          R
        </div>

        <div>
          <div className="serif text-[22px] font-normal leading-[1.25] tracking-[-0.015em] text-d365-ink">
            Enriching briefing…
          </div>
          <div className="mt-2 text-[13px] leading-[1.5] text-d365-ink-2">
            Relay is reading Marketo, PSREF, battle cards, and public web.
          </div>
        </div>

        <div className="w-full">
          <div className="h-1 w-full overflow-hidden rounded-full bg-d365-border">
            <div
              className="h-full rounded-full bg-lenovo-red transition-[width] duration-100 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mono mt-2 flex justify-between text-[11px] text-d365-ink-3">
            <span>elapsed</span>
            <span>
              {seconds}.{tenths}s
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
