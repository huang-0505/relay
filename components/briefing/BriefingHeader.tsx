'use client'

interface BriefingHeaderProps {
  breadcrumb: string
  onClose: () => void
}

export function BriefingHeader({ breadcrumb, onClose }: BriefingHeaderProps) {
  return (
    <div className="flex items-center gap-5 border-b border-d365-border bg-white px-12 py-4">
      <button
        type="button"
        onClick={onClose}
        className="flex cursor-pointer items-center gap-2 rounded border-none bg-transparent px-3 py-2 text-[13px] text-d365-ink-2 transition-all hover:bg-[#F3F2F1] hover:text-d365-ink"
      >
        ← Back to My Day
      </button>
      <div className="flex items-center gap-2 text-[12.5px] text-d365-ink-2">
        <span>My Day</span>
        <span className="text-d365-ink-3">›</span>
        <span>{breadcrumb}</span>
        <span className="text-d365-ink-3">›</span>
        <span className="font-medium text-d365-ink">Relay Briefing</span>
      </div>
      <div className="ml-auto flex gap-2">
        <button
          type="button"
          className="cursor-pointer rounded border border-d365-border-strong bg-white px-3.5 py-1.5 text-xs text-d365-ink"
        >
          Export PDF
        </button>
        <button
          type="button"
          className="cursor-pointer rounded border border-d365-border-strong bg-white px-3.5 py-1.5 text-xs text-d365-ink"
        >
          Share
        </button>
        <button
          type="button"
          className="cursor-pointer rounded border border-d365-blue bg-d365-blue px-3.5 py-1.5 text-xs text-white"
        >
          Start call preparation →
        </button>
      </div>
    </div>
  )
}
