export function AppBar() {
  return (
    <div className="flex h-12 flex-shrink-0 items-center gap-4 bg-d365-blue px-4 text-white">
      <div className="grid h-8 w-8 place-items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden
        >
          <rect x="1" y="1" width="6" height="6" />
          <rect x="9" y="1" width="6" height="6" />
          <rect x="1" y="9" width="6" height="6" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      </div>
      <div className="text-sm font-semibold">
        <span>Dynamics 365</span>
        <span className="mx-2 font-normal opacity-60">|</span>
        <span className="font-normal opacity-85">Sales Hub</span>
      </div>
      <div className="ml-auto flex h-8 w-[460px] items-center rounded-sm bg-white/95 px-3 text-d365-ink-3">
        ⌕ Search
      </div>
      <div className="ml-3 flex gap-1">
        <div className="grid h-8 w-8 place-items-center text-sm">⚙</div>
        <div className="grid h-8 w-8 place-items-center text-sm">?</div>
      </div>
      <div className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-accent-purple text-xs font-semibold">
        MT
      </div>
    </div>
  )
}
