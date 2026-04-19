'use client'

import { useCallback, useState } from 'react'
import { BriefingView } from '@/components/briefing/BriefingView'
import { Greeting } from '@/components/my-day/Greeting'
import { PipelineSection } from '@/components/my-day/PipelineSection'
import { PrioritySection } from '@/components/my-day/PrioritySection'
import { RelayStatusBar } from '@/components/my-day/RelayStatusBar'
import { StatsStrip } from '@/components/my-day/StatsStrip'
import { AppShell } from '@/components/shell/AppShell'
import { BRIEFINGS } from '@/lib/mock-data'

export default function Home() {
  const [openBriefingId, setOpenBriefingId] = useState<string | null>(null)

  const handleOpen = useCallback((id: string) => {
    setOpenBriefingId(id)
  }, [])

  const handleClose = useCallback(() => {
    setOpenBriefingId(null)
  }, [])

  const briefing = openBriefingId ? BRIEFINGS[openBriefingId] ?? null : null

  return (
    <>
      <AppShell>
        <RelayStatusBar />
        <Greeting />
        <StatsStrip />
        <PrioritySection onOpenBriefing={handleOpen} />
        <PipelineSection />
      </AppShell>
      <BriefingView briefing={briefing} onClose={handleClose} />
    </>
  )
}
