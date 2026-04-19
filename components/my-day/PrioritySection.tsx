'use client'

import { useCallback, useMemo, useState } from 'react'
import type { Opportunity } from '@/lib/types'
import { PRIORITY_OPPORTUNITIES } from '@/lib/mock-data'
import { OpportunityCard } from './OpportunityCard'

interface PrioritySectionProps {
  onOpenBriefing: (briefingId: string) => void
}

type SimStage = 'idle' | 'toast' | 'working' | 'ready'

const SIMULATED_OPP: Opportunity = {
  id: 'lakeshore',
  title: 'Lakeshore Regional Medical · AI Imaging Pilot',
  rating: { label: 'HOT', score: 88 },
  leadName: 'Dr. Sarah Chen',
  leadContext:
    'VP Clinical Operations · just arrived via Marketo · enriching now',
  stage: 'New',
  value: { note: 'TBD' },
  relay: { kind: 'working' },
  briefingId: 'lakeshore',
}

export function PrioritySection({ onOpenBriefing }: PrioritySectionProps) {
  const [simStage, setSimStage] = useState<SimStage>('idle')
  const [filter, setFilter] = useState<'all' | 'with-relay'>('all')

  const startSimulation = useCallback(async () => {
    if (simStage !== 'idle') return

    // 1. Toast slides in (~300ms delay)
    setSimStage('toast')
    await sleep(300)

    // 2. After 1.2s, insert card with working state
    await sleep(1200)
    setSimStage('working')

    // 3. Hide toast after another ~2.2s
    await sleep(2200)

    // 4. After another 1s of "enriching", flip to briefing ready
    await sleep(1000)
    setSimStage('ready')
  }, [simStage])

  const { opportunities, priorityCount } = useMemo(() => {
    if (simStage === 'idle' || simStage === 'toast') {
      return {
        opportunities: PRIORITY_OPPORTUNITIES,
        priorityCount: PRIORITY_OPPORTUNITIES.length,
      }
    }

    const incoming: Opportunity =
      simStage === 'ready'
        ? {
            ...SIMULATED_OPP,
            leadContext:
              'VP Clinical Operations · MQL via medical imaging content · Relay enriched · just now',
            relay: { kind: 'ready', featured: true },
          }
        : SIMULATED_OPP

    const shifted = PRIORITY_OPPORTUNITIES.map((o, idx) => ({
      ...o,
      priority: idx === 0 ? 2 : idx === 1 ? 3 : undefined,
      relay:
        idx === 0 && o.relay.kind === 'ready'
          ? { ...o.relay, featured: false }
          : o.relay,
    }))

    return {
      opportunities: [incoming, ...shifted],
      priorityCount: shifted.length + 1,
    }
  }, [simStage])

  const toastVisible = simStage === 'toast' || simStage === 'working'
  const btnDisabled = simStage !== 'idle' && simStage !== 'ready'
  const btnLabel =
    simStage === 'idle'
      ? 'Simulate new MQL'
      : simStage === 'ready'
        ? 'Run again'
        : 'MQL incoming…'

  const handleBtnClick = () => {
    if (simStage === 'ready') {
      window.location.reload()
      return
    }
    startSimulation()
  }

  return (
    <>
      <div className="px-10 pb-8 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="serif inline-block text-[19px] font-medium tracking-[-0.01em] text-d365-ink">
            Priority this morning{' '}
            <span className="mono ml-2 text-xs text-d365-ink-3">
              {priorityCount} items
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`cursor-pointer rounded-[3px] border px-3 py-1.5 text-xs ${
                filter === 'all'
                  ? 'border-d365-blue bg-d365-blue-light font-semibold text-d365-blue'
                  : 'border-d365-border bg-white text-d365-ink'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('with-relay')}
              className={`cursor-pointer rounded-[3px] border px-3 py-1.5 text-xs ${
                filter === 'with-relay'
                  ? 'border-d365-blue bg-d365-blue-light font-semibold text-d365-blue'
                  : 'border-d365-border bg-white text-d365-ink'
              }`}
            >
              With Relay briefing
            </button>
            <button
              type="button"
              onClick={handleBtnClick}
              disabled={btnDisabled}
              className="flex cursor-pointer items-center gap-2 rounded bg-lenovo-ink px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-lenovo-red disabled:cursor-not-allowed disabled:opacity-50 [&:hover_.pulse-dot]:bg-white"
            >
              <span
                className="pulse-dot h-1.5 w-1.5 rounded-full bg-lenovo-red"
                style={{ animation: 'relay-pulse 1.6s infinite' }}
              />
              {btnLabel}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              incoming={opp.id === 'lakeshore'}
              onOpenBriefing={onOpenBriefing}
            />
          ))}
        </div>
      </div>

      <MqlToast visible={toastVisible} />
    </>
  )
}

function MqlToast({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed right-10 top-[68px] z-50 flex max-w-[420px] items-center gap-3 rounded-lg bg-lenovo-ink px-4 py-3.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-5 opacity-0'
      }`}
      style={visible ? { pointerEvents: 'auto' } : undefined}
    >
      <span className="absolute left-0 right-0 top-0 h-0.5 rounded-t-lg bg-lenovo-red" />
      <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-[5px] bg-marketo-purple font-serif text-[15px] font-bold text-white">
        M
      </div>
      <div className="flex-1">
        <div className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
          ● New MQL · Marketo
        </div>
        <div className="text-[12.5px] leading-[1.4]">
          <strong className="font-semibold text-white">Dr. Sarah Chen</strong> ·
          VP Clinical Ops at Lakeshore Regional Medical · MQL score 88 · Relay
          enriching now…
        </div>
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
