'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
import type { Briefing } from '@/lib/types'

const BREADCRUMBS: Record<string, string> = {
  meridian: 'Meridian Health · Radiology AI Infrastructure',
  westfield: 'Westfield Medical Group · Endpoint Refresh',
  lakeshore: 'Lakeshore Regional Medical · AI Imaging Pilot',
}

const PRELOAD_LEAD_IDS = ['meridian', 'westfield'] as const

export default function Home() {
  const [viewState, setViewState] = useState<BriefingViewState>({
    status: 'closed',
  })

  const cacheRef = useRef<Map<string, Briefing>>(new Map())
  const inFlightRef = useRef<Map<string, Promise<Briefing>>>(new Map())
  const activeRequestRef = useRef<string | null>(null)
  const preloadFiredRef = useRef(false)
  // Briefings the user has already been shown. First-reveal uses the
  // skeleton/streaming animations; subsequent opens render instantly.
  const seenRef = useRef<Set<string>>(new Set())

  const requestBriefing = useCallback((leadId: string): Promise<Briefing> => {
    const existing = inFlightRef.current.get(leadId)
    if (existing) return existing

    const promise = fetchBriefing(leadId)
      .then((briefing) => {
        cacheRef.current.set(leadId, briefing)
        return briefing
      })
      .catch((err) => {
        const fallback = BRIEFINGS[leadId]
        if (fallback) {
          cacheRef.current.set(leadId, fallback)
          console.error(
            '[Relay] live generation failed, using fallback briefing:',
            err,
          )
          return fallback
        }
        console.error('[Relay] briefing generation failed, no fallback:', err)
        throw err
      })
      .finally(() => {
        inFlightRef.current.delete(leadId)
      })

    inFlightRef.current.set(leadId, promise)
    return promise
  }, [])

  // Preload Meridian + Westfield silently on mount.
  useEffect(() => {
    if (preloadFiredRef.current) return
    preloadFiredRef.current = true
    for (const leadId of PRELOAD_LEAD_IDS) {
      requestBriefing(leadId).catch(() => {})
    }
  }, [requestBriefing])

  const handleOpen = useCallback(
    (leadId: string) => {
      const cached = cacheRef.current.get(leadId)
      if (cached) {
        seenRef.current.add(leadId)
        setViewState({ status: 'ready', briefing: cached, isStreaming: false })
        return
      }

      const breadcrumb = BREADCRUMBS[leadId] ?? ''
      const lead = leadFromLeadId(leadId)
      const startedAt = Date.now()
      activeRequestRef.current = leadId
      const wasSeen = seenRef.current.has(leadId)

      // Cache miss: show the full briefing layout with skeletons immediately.
      // Rail uses the lead lookup so identity renders from 0ms.
      setViewState({
        status: 'skeleton-loading',
        leadId,
        breadcrumb,
        lead,
        startedAt,
      })

      requestBriefing(leadId)
        .then((briefing) => {
          if (activeRequestRef.current !== leadId) return
          const isStreaming = !wasSeen
          seenRef.current.add(leadId)
          setViewState({ status: 'ready', briefing, isStreaming })
        })
        .catch(() => {
          // Unreachable — requestBriefing's fallback covers both mock leads.
          // Leave the skeleton up rather than surface an error.
        })
    },
    [requestBriefing],
  )

  const handleClose = useCallback(() => {
    activeRequestRef.current = null
    setViewState({ status: 'closed' })
  }, [])

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

async function fetchBriefing(leadId: string): Promise<Briefing> {
  const res = await fetch('/api/generate-briefing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadId }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${body || res.statusText}`)
  }
  return (await res.json()) as Briefing
}
