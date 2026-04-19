'use client'

import { useEffect } from 'react'
import type { Briefing } from '@/lib/types'
import { BriefingHeader } from './BriefingHeader'
import { BriefingMain } from './BriefingMain'
import { BriefingRail } from './BriefingRail'
import { BriefingSkeleton } from './BriefingSkeleton'

export type BriefingViewState =
  | { status: 'closed' }
  | { status: 'loading'; leadId: string; breadcrumb: string; startedAt: number }
  | { status: 'ready'; briefing: Briefing }

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

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-d365-bg">
      <BriefingHeader breadcrumb={breadcrumb} onClose={onClose} />
      {state.status === 'loading' ? (
        <BriefingSkeleton startedAt={state.startedAt} />
      ) : (
        <div className="grid flex-1 grid-cols-[1fr_360px] overflow-hidden">
          <div className="overflow-y-auto">
            <BriefingMain briefing={state.briefing} />
          </div>
          <BriefingRail briefing={state.briefing} />
        </div>
      )}
    </div>
  )
}
