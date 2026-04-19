'use client'

import type { MouseEvent } from 'react'
import type { RelayState } from '@/lib/types'

interface RelayBadgeProps {
  state: RelayState
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export function RelayBadge({ state, onClick }: RelayBadgeProps) {
  if (state.kind === 'skipped' || state.kind === 'monitoring') {
    return (
      <div className="whitespace-nowrap rounded-md border border-dashed border-d365-border-strong px-3.5 py-2 text-[11px] text-d365-ink-3">
        {state.reason}
      </div>
    )
  }

  if (state.kind === 'stale') {
    return (
      <div className="whitespace-nowrap rounded-md border border-dashed border-d365-border-strong px-3.5 py-2 text-[11px] text-d365-ink-3">
        Stale
      </div>
    )
  }

  const isWorking = state.kind === 'working'
  const isFeatured = state.kind === 'ready' && state.featured === true

  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md py-2 pl-2.5 pr-3 text-[11.5px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-lenovo-red ${
        isWorking ? 'bg-lenovo-ink-2' : 'bg-lenovo-ink'
      }`}
      style={
        isWorking
          ? { animation: 'relay-working-bg 1.5s ease-in-out infinite alternate' }
          : undefined
      }
    >
      {isFeatured && (
        <span
          className="pointer-events-none absolute inset-0 rounded-md"
          style={{ animation: 'relay-glow 2s ease-out infinite' }}
        />
      )}
      <div
        className="grid h-[22px] w-[22px] place-items-center rounded bg-lenovo-red font-serif text-[13px] font-bold"
        style={
          isWorking
            ? { animation: 'relay-spin 1.2s linear infinite' }
            : undefined
        }
      >
        R
      </div>
      <div className="flex flex-col items-start gap-px">
        <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/60">
          RELAY
        </div>
        <div className="text-[11.5px]">
          {isWorking ? 'Enriching…' : 'Briefing ready'}
        </div>
      </div>
    </div>
  )
}
