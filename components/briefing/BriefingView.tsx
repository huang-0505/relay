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
      status: 'skeleton-loading'
      leadId: string
      breadcrumb: string
      lead: Lead | null
      startedAt: number
    }
  | { status: 'ready'; briefing: Briefing; isStreaming: boolean }

interface BriefingViewProps {
  state: BriefingViewState
  onClose: () => void
}

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

  // Rail lead: during skeleton, pulled from MOCK_MARKETO_LEADS via the
  // leadFromLeadId lookup in page.tsx. During ready, pulled from the
  // briefing itself.
  const railLead: Lead | null =
    state.status === 'ready' ? state.briefing.lead : state.lead

  const briefingForBody = state.status === 'ready' ? state.briefing : null
  const renderState =
    state.status === 'skeleton-loading'
      ? 'skeleton'
      : state.isStreaming
        ? 'streaming'
        : 'ready'

  const progressStart =
    state.status === 'skeleton-loading' ? state.startedAt : null
  const progressComplete = state.status === 'ready'

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-d365-bg">
      <BriefingHeader breadcrumb={breadcrumb} onClose={onClose} />
      <ProgressBar startedAt={progressStart} complete={progressComplete} />
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
