'use client'

import { useEffect } from 'react'
import type { Briefing } from '@/lib/types'
import { BriefingHeader } from './BriefingHeader'
import { BriefingMain } from './BriefingMain'
import { BriefingRail } from './BriefingRail'

interface BriefingViewProps {
  briefing: Briefing | null
  onClose: () => void
}

export function BriefingView({ briefing, onClose }: BriefingViewProps) {
  useEffect(() => {
    if (!briefing) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [briefing, onClose])

  if (!briefing) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-d365-bg">
      <BriefingHeader breadcrumb={briefing.breadcrumb} onClose={onClose} />
      <div className="grid flex-1 grid-cols-[1fr_360px] overflow-hidden">
        <div className="overflow-y-auto">
          <BriefingMain briefing={briefing} />
        </div>
        <BriefingRail briefing={briefing} />
      </div>
    </div>
  )
}
