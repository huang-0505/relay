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
import type { Briefing } from '@/lib/types'

const BREADCRUMBS: Record<string, string> = {
  meridian: 'Meridian Health · Radiology AI Infrastructure',
  lakeshore: 'Lakeshore Regional Medical · AI Imaging Pilot',
}

export default function Home() {
  const [viewState, setViewState] = useState<BriefingViewState>({
    status: 'closed',
  })

  const cacheRef = useRef<Map<string, Briefing>>(new Map())
  const activeRequestRef = useRef<string | null>(null)

  const handleOpen = useCallback((leadId: string) => {
    const cached = cacheRef.current.get(leadId)
    if (cached) {
      setViewState({ status: 'ready', briefing: cached })
      return
    }

    const breadcrumb = BREADCRUMBS[leadId] ?? ''
    const startedAt = Date.now()
    activeRequestRef.current = leadId

    setViewState({ status: 'loading', leadId, breadcrumb, startedAt })

    fetchBriefing(leadId)
      .then((briefing) => {
        cacheRef.current.set(leadId, briefing)
        if (activeRequestRef.current === leadId) {
          setViewState({ status: 'ready', briefing })
        }
      })
      .catch((err) => {
        console.error('[Relay] briefing generation failed:', err)
        const fallback = BRIEFINGS[leadId]
        if (fallback) {
          cacheRef.current.set(leadId, fallback)
          if (activeRequestRef.current === leadId) {
            setViewState({ status: 'ready', briefing: fallback })
          }
        } else if (activeRequestRef.current === leadId) {
          // No fallback — hold on the skeleton rather than surface an error.
          // In practice both mock leads have fallbacks, so this branch is unreachable.
          console.error('[Relay] no fallback briefing for leadId:', leadId)
        }
      })
  }, [])

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
