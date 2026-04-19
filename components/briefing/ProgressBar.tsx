'use client'

import { useEffect, useState } from 'react'

interface ProgressBarProps {
  startedAt: number | null
  complete: boolean
}

// 0 → 80% over TARGET_MS with ease-out, then hold at 80% until `complete`
// flips, at which point the container snaps to 100% and fades out.
const TARGET_MS = 20_000
const HOLD_CEILING = 80

function progressAt(elapsedMs: number): number {
  if (elapsedMs >= TARGET_MS) return HOLD_CEILING
  const t = elapsedMs / TARGET_MS
  const eased = 1 - Math.pow(1 - t, 2)
  return eased * HOLD_CEILING
}

export function ProgressBar({ startedAt, complete }: ProgressBarProps) {
  const [elapsedMs, setElapsedMs] = useState(() =>
    startedAt ? Date.now() - startedAt : 0,
  )
  const [hidden, setHidden] = useState(false)

  // Tick while we have a start time and are not complete.
  useEffect(() => {
    if (startedAt === null || complete) return
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 100)
    return () => clearInterval(id)
  }, [startedAt, complete])

  // On completion: fade the bar out after it snaps to 100%. ProgressBar
  // remounts on every briefing open, so no reset for `complete` going
  // back to false is needed.
  useEffect(() => {
    if (!complete) return
    const id = setTimeout(() => setHidden(true), 400)
    return () => clearTimeout(id)
  }, [complete])

  if (startedAt === null) return null

  const pct = complete ? 100 : progressAt(elapsedMs)

  return (
    <div
      className="relative h-0.5 w-full bg-d365-border transition-opacity duration-300"
      style={{ opacity: hidden ? 0 : 1 }}
      aria-hidden
    >
      <div
        className="h-full bg-lenovo-red"
        style={{
          width: `${pct}%`,
          transition: complete
            ? 'width 300ms ease-out'
            : 'width 120ms linear',
        }}
      />
    </div>
  )
}
