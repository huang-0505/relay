'use client'

import { useCallback, useRef, useState } from 'react'
import {
  BriefingView,
  type BriefingViewState,
} from '@/components/briefing/BriefingView'
import { Greeting } from '@/components/my-day/Greeting'
import { PipelineSection } from '@/components/my-day/PipelineSection'
import { PrioritySection } from '@/components/my-day/PrioritySection'
import { RelayStatusBar } from '@/components/my-day/RelayStatusBar'
import { StatsStrip } from '@/components/my-day/StatsStrip'
import { AppShell } from '@/components/shell/AppShell'
import { BRIEFINGS } from '@/lib/mock-data'
import { leadFromLeadId } from '@/lib/mock-marketo'

const BREADCRUMBS: Record<string, string> = {
  meridian: 'Meridian Health · Radiology AI Infrastructure',
  westfield: 'Westfield Medical Group · Endpoint Refresh',
  lakeshore: 'Lakeshore Regional Medical · AI Imaging Pilot',
}

// Lakeshore's first open gets a short artificial "processing" moment —
// skeleton layout + progress bar for this long, then the real briefing
// fades in via StreamingReveal's 3.2s stagger.
const REVEAL_MS = 1000

// Leads that get the skeleton → streaming reveal treatment on their
// FIRST open. Everything else (and every re-open) renders instantly.
const REVEAL_LEAD_IDS = new Set(['lakeshore'])

export default function Home() {
  const [viewState, setViewState] = useState<BriefingViewState>({
    status: 'closed',
  })

  // Briefings the user has already been shown. Controls whether the
  // reveal animation plays on open.
  const seenRef = useRef<Set<string>>(new Set())
  // Active reveal timer — cleared on close or on a fresh open.
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearRevealTimer = useCallback(() => {
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current)
      revealTimerRef.current = null
    }
  }, [])

  const handleOpen = useCallback(
    (leadId: string) => {
      clearRevealTimer()

      const briefing = BRIEFINGS[leadId]
      if (!briefing) {
        // Defensive — all three demo leads have hand-written mocks, so
        // this branch should never fire in practice.
        console.error('[Relay] no briefing found for leadId:', leadId)
        return
      }

      const shouldReveal =
        REVEAL_LEAD_IDS.has(leadId) && !seenRef.current.has(leadId)

      if (!shouldReveal) {
        seenRef.current.add(leadId)
        setViewState({ status: 'ready', briefing, isStreaming: false })
        return
      }

      // Lakeshore first-open flow: skeleton for REVEAL_MS, then stream
      // the real briefing in.
      const startedAt = Date.now()
      setViewState({
        status: 'revealing',
        leadId,
        breadcrumb: BREADCRUMBS[leadId] ?? '',
        lead: leadFromLeadId(leadId),
        startedAt,
      })

      revealTimerRef.current = setTimeout(() => {
        revealTimerRef.current = null
        seenRef.current.add(leadId)
        setViewState({
          status: 'ready',
          briefing,
          isStreaming: true,
          revealStartedAt: startedAt,
        })
      }, REVEAL_MS)
    },
    [clearRevealTimer],
  )

  const handleClose = useCallback(() => {
    clearRevealTimer()
    setViewState({ status: 'closed' })
  }, [clearRevealTimer])

  return (
    <>
      <AppShell>
        <RelayStatusBar />
        <Greeting />
        <StatsStrip />
        <PrioritySection onOpenBriefing={handleOpen} />
        <PipelineSection />
      </AppShell>
      <BriefingView state={viewState} onClose={handleClose} />
    </>
  )
}
