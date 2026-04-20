'use client'

import { useEffect } from 'react'
import type { Briefing, Lead } from '@/lib/types'
import { BriefingHeader } from './BriefingHeader'
import { BriefingMain } from './BriefingMain'
import { BriefingRail } from './BriefingRail'
import { ProgressBar } from './ProgressBar'

export type BriefingViewState =
  | { status: 'closed' }
  | {
      status: 'revealing'
      leadId: string
      breadcrumb: string
      lead: Lead | null
      startedAt: number
    }
  | {
      status: 'ready'
      briefing: Briefing
      isStreaming: boolean
      // Set only when transitioning from 'revealing' so the progress
      // bar can snap to 100% and fade out. Undefined on instant opens
      // (Meridian / Westfield / Lakeshore re-open) — bar stays hidden.
      revealStartedAt?: number
    }

interface BriefingViewProps {
  state: BriefingViewState
  onClose: () => void
}

// Matches the REVEAL_MS constant in app/page.tsx. Kept local so the
// progress bar pacing stays coupled to the visible skeleton duration.
const REVEAL_TARGET_MS = 1000

export function BriefingView({ state, onClose }: BriefingViewProps) {
  useEffect(() => {
    if (state.status === 'closed') return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [state.status, onClose])

  if (state.status === 'closed') return null

  const breadcrumb =
    state.status === 'ready' ? state.briefing.breadcrumb : state.breadcrumb

  const railLead: Lead | null =
    state.status === 'ready' ? state.briefing.lead : state.lead

  const briefingForBody = state.status === 'ready' ? state.briefing : null

  const renderState =
    state.status === 'revealing'
      ? 'skeleton'
      : state.isStreaming
        ? 'streaming'
        : 'ready'

  const progressStart =
    state.status === 'revealing'
      ? state.startedAt
      : state.status === 'ready' && state.revealStartedAt !== undefined
        ? state.revealStartedAt
        : null

  const progressComplete =
    state.status === 'ready' && state.revealStartedAt !== undefined

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-d365-bg">
      <BriefingHeader breadcrumb={breadcrumb} onClose={onClose} />
      <ProgressBar
        startedAt={progressStart}
        complete={progressComplete}
        targetMs={REVEAL_TARGET_MS}
        linear
      />
      <div className="grid flex-1 grid-cols-[1fr_360px] overflow-hidden">
        <div className="overflow-y-auto">
          <BriefingMain briefing={briefingForBody} renderState={renderState} />
        </div>
        {railLead ? (
          <BriefingRail lead={railLead} briefing={briefingForBody} />
        ) : (
          <div className="border-l border-d365-border bg-white" />
        )}
      </div>
    </div>
  )
}
