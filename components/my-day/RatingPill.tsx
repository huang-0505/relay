import type { LeadRating } from '@/lib/types'

interface RatingPillProps {
  label: LeadRating
  score?: number
}

const toneByLabel: Record<LeadRating, string> = {
  HOT: 'bg-accent-amber-soft text-accent-amber',
  WARM: 'bg-accent-amber-soft text-accent-brown opacity-70',
  COOL: 'bg-[#F3F4F6] text-d365-ink-2',
  MQL: 'bg-[#F3F4F6] text-d365-ink-2',
  EARLY: 'bg-[#F3F4F6] text-d365-ink-2',
}

export function RatingPill({ label, score }: RatingPillProps) {
  return (
    <span
      className={`rounded-[10px] px-[7px] py-0.5 text-[10px] font-bold tracking-[0.04em] ${toneByLabel[label]}`}
    >
      {score !== undefined ? `${label} · ${score}` : label}
    </span>
  )
}
