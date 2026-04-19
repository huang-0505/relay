interface BriefTagProps {
  generatedMinutesAgo: number
}

export function BriefTag({ generatedMinutesAgo }: BriefTagProps) {
  return (
    <div className="mb-3.5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-lenovo-red">
      <div className="grid h-[18px] w-[18px] place-items-center rounded-[3px] bg-lenovo-ink font-serif text-[11px] font-bold text-white">
        R
      </div>
      <span>
        Relay · First-call briefing · Generated {generatedMinutesAgo} min ago
      </span>
    </div>
  )
}
