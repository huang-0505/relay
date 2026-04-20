'use client'

import { useEffect, useState } from 'react'

interface ProgressBarProps {
  startedAt: number | null
  complete: boolean
  targetMs?: number
  linear?: boolean
}

// Progress reaches HOLD_CEILING at targetMs. Beyond that, holds flat
// until `complete` flips, at which point the container snaps to 100%
// and fades out.
const DEFAULT_TARGET_MS = 20_000
const HOLD_CEILING = 80

function progressAt(elapsedMs: number, targetMs: number, linear: boolean): number {
  if (elapsedMs >= targetMs) return HOLD_CEILING
  const t = elapsedMs / targetMs
  const curve = linear ? t : 1 - Math.pow(1 - t, 2)
  return curve * HOLD_CEILING
}

export function ProgressBar({
  startedAt,
  complete,
  targetMs = DEFAULT_TARGET_MS,
  linear = false,
}: ProgressBarProps) {
  const [elapsedMs, setElapsedMs] = useState(() =>
    startedAt ? Date.now() - startedAt : 0,
  )
  const [hidden, setHidden] = useState(false)

  // Tick while loading. Short revealMs flows (like the 1000ms Lakeshore
  // reveal) need a faster tick to look smooth at the end of the ramp.
  useEffect(() => {
    if (startedAt === null || complete) return
    const tickMs = targetMs < 3000 ? 40 : 100
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, tickMs)
    return () => clearInterval(id)
  }, [startedAt, complete, targetMs])

  // Fade out 400ms after completion.
  useEffect(() => {
    if (!complete) return
    const id = setTimeout(() => setHidden(true), 400)
    return () => clearTimeout(id)
  }, [complete])

  if (startedAt === null) return null

  const pct = complete ? 100 : progressAt(elapsedMs, targetMs, linear)

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
            : `width ${targetMs < 3000 ? 60 : 120}ms linear`,
        }}
      />
    </div>
  )
}
