'use client'

import type { MouseEvent } from 'react'
import type { Opportunity } from '@/lib/types'
import { RatingPill } from './RatingPill'
import { RelayBadge } from './RelayBadge'

interface OpportunityCardProps {
  opp: Opportunity
  incoming?: boolean
  onOpenBriefing?: (briefingId: string) => void
}

export function OpportunityCard({
  opp,
  incoming,
  onOpenBriefing,
}: OpportunityCardProps) {
  const isFeatured =
    opp.relay.kind === 'ready' && opp.relay.featured === true

  const base =
    'grid cursor-pointer grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 rounded-lg border px-5 py-4 transition-all'

  const variant = incoming
    ? 'relative border-lenovo-red bg-[linear-gradient(to_right,#FEF3C7,white_30%)] shadow-[0_4px_16px_rgba(226,35,26,0.15)]'
    : isFeatured
      ? 'relative border-lenovo-red bg-[linear-gradient(to_right,var(--color-lenovo-red-soft),white_30%)] shadow-[0_2px_8px_rgba(226,35,26,0.08)]'
      : 'border-d365-border bg-white hover:border-d365-border-strong hover:shadow-[0_2px_6px_rgba(0,0,0,0.04)]'

  const handleBadgeClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (opp.briefingId && onOpenBriefing) {
      onOpenBriefing(opp.briefingId)
    }
  }

  return (
    <div
      className={`${base} ${variant}`}
      style={
        incoming
          ? { animation: 'slide-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }
          : undefined
      }
    >
      {(isFeatured || incoming) && (
        <span className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] rounded-l-lg bg-lenovo-red" />
      )}

      <div
        className={`serif w-8 text-center text-[22px] font-normal italic ${
          isFeatured || incoming
            ? 'font-medium text-lenovo-red'
            : 'text-d365-ink-3'
        }`}
      >
        {opp.priority !== undefined
          ? `${opp.priority}.`
          : incoming
            ? '●'
            : ''}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 text-sm font-semibold tracking-[-0.01em] text-d365-ink">
          <span>{opp.title}</span>
          <RatingPill label={opp.rating.label} score={opp.rating.score} />
        </div>
        <div className="mt-1 text-xs text-d365-ink-2">
          {opp.leadName && (
            <strong className="font-medium text-d365-ink">
              {opp.leadName}
            </strong>
          )}
          {opp.leadName && ' · '}
          {opp.leadContext}
        </div>
      </div>

      <div className="whitespace-nowrap rounded-[10px] bg-[#F3F2F1] px-2.5 py-1 text-[11px] font-medium text-d365-ink-3">
        {opp.stage}
      </div>

      <div className="serif text-right text-[15px] font-medium tracking-[-0.01em] text-d365-ink">
        {opp.value.amount ?? '$—'}
        {opp.value.note && (
          <>
            <br />
            <span className="text-[10px] text-d365-ink-3">{opp.value.note}</span>
          </>
        )}
      </div>

      <RelayBadge state={opp.relay} onClick={handleBadgeClick} />
    </div>
  )
}
