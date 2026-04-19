import { RELAY_STATUS } from '@/lib/mock-data'

export function RelayStatusBar() {
  const { enrichedOvernight, skipped, avgDuration, lastSync, connected } =
    RELAY_STATUS

  return (
    <div className="relative flex items-center gap-5 overflow-hidden bg-[linear-gradient(to_right,var(--color-lenovo-ink)_0%,#1C232B_100%)] px-10 py-2.5 text-xs text-white">
      <span className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(to_right,var(--color-lenovo-red),transparent_50%)]" />
      <div className="flex items-center gap-2 font-semibold">
        <div className="grid h-[18px] w-[18px] place-items-center rounded-[3px] bg-lenovo-red font-serif text-[11px] font-bold">
          R
        </div>
        <span>Relay</span>
      </div>
      <div className="h-3.5 w-px bg-white/20" />
      <div className="flex items-center gap-1.5 text-white/85">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
        <span>
          <strong className="font-semibold text-white">
            {enrichedOvernight} MQLs enriched overnight
          </strong>{' '}
          · {skipped} skipped (low fit) · avg {avgDuration}
        </span>
      </div>
      <div className="h-3.5 w-px bg-white/20" />
      <div className="flex items-center gap-1.5 text-white/85">
        <span>
          Last sync: <strong className="font-semibold text-white">{lastSync}</strong>
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2 text-[10.5px] text-white/60">
        <span>Connected:</span>
        {connected.map((c) => (
          <span
            key={c}
            className="mono rounded-[10px] border border-white/20 px-2 py-0.5 text-[10px]"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
