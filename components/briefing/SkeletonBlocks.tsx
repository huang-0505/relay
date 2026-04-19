// Grey-bar placeholders that mirror the shape + border + padding of each
// real briefing section. Sizes are approximate — within ~8px of the real
// content — so the layout doesn't jump when skeletons are replaced.

const pulseStyle = {
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
}

interface BarProps {
  width?: string
  height?: string
  className?: string
}

function Bar({ width = '100%', height = '12px', className = '' }: BarProps) {
  return (
    <div
      className={`rounded-sm bg-d365-border ${className}`}
      style={{ ...pulseStyle, width, height }}
    />
  )
}

export function SkeletonHead() {
  return (
    <section>
      <div className="mb-3.5 flex items-center gap-2">
        <div
          className="h-[18px] w-[18px] rounded-[3px] bg-lenovo-ink/60"
          style={pulseStyle}
        />
        <Bar width="280px" height="10px" />
      </div>
      <div className="mb-8 border-b border-d365-border pb-6">
        <Bar width="88%" height="22px" className="mb-3" />
        <Bar width="54%" height="22px" />
      </div>
    </section>
  )
}

export function SkeletonSummary() {
  return (
    <section>
      <div className="mb-3.5 border-b border-d365-border pb-2">
        <Bar width="120px" height="10px" />
      </div>
      <div className="mb-[18px] flex flex-col gap-2.5">
        <Bar width="96%" />
        <Bar width="92%" />
        <Bar width="88%" />
        <Bar width="72%" />
      </div>
    </section>
  )
}

export function SkeletonMqlBand() {
  return (
    <section>
      <div className="relative mb-4 flex items-center gap-4 overflow-hidden rounded-md border border-marketo-border bg-[linear-gradient(90deg,var(--color-marketo-purple-light)_0%,#F8F5FD_100%)] px-[18px] py-3">
        <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-marketo-purple" />
        <div
          className="h-[14px] w-[100px] flex-shrink-0 rounded-sm bg-marketo-purple/30"
          style={pulseStyle}
        />
        <div className="flex-1">
          <Bar width="80%" height="12px" />
        </div>
      </div>
    </section>
  )
}

export function SkeletonFacts() {
  return (
    <section className="mb-9">
      <div className="grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md border border-d365-border bg-white px-3.5 py-3"
          >
            <Bar width="48px" height="10px" className="mb-2.5 bg-lenovo-red/30" />
            <Bar width="90%" height="13px" className="mb-1.5" />
            <Bar width="70%" height="11px" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function SkeletonProducts() {
  return (
    <section>
      <div className="mb-3.5 flex items-center justify-between border-b border-d365-border pb-2.5">
        <Bar width="160px" height="10px" className="bg-lenovo-red/30" />
        <Bar width="180px" height="10px" />
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`mb-2 grid grid-cols-[1fr_auto] items-center gap-[18px] rounded-md px-[18px] py-3.5 ${
            i === 0
              ? 'border-[1.5px] border-lenovo-red bg-[linear-gradient(to_right,var(--color-lenovo-red-soft),white_40%)]'
              : 'border border-d365-border bg-white'
          }`}
        >
          <div>
            <Bar width={i === 0 ? '60%' : '40%'} height="14px" className="mb-2" />
            <Bar width="85%" height="11px" />
          </div>
          <Bar
            width="80px"
            height="22px"
            className={i === 0 ? 'bg-accent-green-soft' : ''}
          />
        </div>
      ))}
    </section>
  )
}

export function SkeletonTalkPoints() {
  return (
    <section>
      {/* Collapse toggle header */}
      <div className="mb-2 flex w-full items-center gap-2.5 rounded-md border border-d365-border bg-white px-4 py-3">
        <Bar width="10px" height="10px" />
        <Bar width="240px" height="12px" />
        <Bar width="180px" height="10px" className="ml-auto" />
      </div>
      {/* Open panel with 3 talk points */}
      <div className="-mt-px rounded-b-md border-b border-l border-r border-d365-border bg-paper px-[18px] pb-[18px] pt-4">
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex gap-4 rounded-md border border-d365-border bg-white px-[18px] py-4"
            >
              <div
                className="h-[22px] w-[14px] flex-shrink-0 rounded-sm bg-lenovo-red/40"
                style={pulseStyle}
              />
              <div className="flex-1">
                <Bar width="70%" height="13px" className="mb-2" />
                <Bar width="94%" height="11px" className="mb-1.5" />
                <Bar width="62%" height="11px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkeletonCollapsedGroup() {
  return (
    <section className="flex flex-col gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex w-full items-center gap-2.5 rounded-md border border-d365-border px-4 py-3 ${
            i === 2 ? 'bg-paper' : 'bg-white'
          }`}
        >
          <Bar width="10px" height="10px" />
          <Bar width={i === 0 ? '140px' : i === 1 ? '200px' : '220px'} height="12px" />
          <Bar width="180px" height="10px" className="ml-auto" />
        </div>
      ))}
    </section>
  )
}

export function SkeletonSources() {
  return (
    <section className="mt-6 border-t border-d365-border pt-6">
      <Bar width="120px" height="10px" className="mb-3" />
      <div className="flex flex-wrap gap-2">
        {[
          { w: '180px', tint: 'bg-marketo-purple-light' },
          { w: '200px', tint: 'bg-lenovo-red-soft' },
          { w: '160px', tint: 'bg-lenovo-red-soft' },
          { w: '220px', tint: 'bg-lenovo-red-soft' },
          { w: '140px' },
          { w: '170px' },
          { w: '120px' },
        ].map((chip, i) => (
          <div
            key={i}
            className={`h-[26px] rounded-[3px] border border-d365-border ${chip.tint ?? 'bg-white'}`}
            style={{ ...pulseStyle, width: chip.w }}
          />
        ))}
      </div>
    </section>
  )
}

// Ordered list of the 8 skeleton sections, matching BriefingMain's real
// sections so the stagger order lines up top-to-bottom.
export const SKELETON_SECTIONS = [
  <SkeletonHead key="head" />,
  <SkeletonSummary key="summary" />,
  <SkeletonMqlBand key="mql" />,
  <SkeletonFacts key="facts" />,
  <SkeletonProducts key="products" />,
  <SkeletonTalkPoints key="talk" />,
  <SkeletonCollapsedGroup key="collapsed" />,
  <SkeletonSources key="sources" />,
]
