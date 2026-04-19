const icons = [
  { glyph: '◫', active: false },
  { glyph: '◉', active: true },
  { glyph: '☰', active: false },
  { glyph: '◈', active: false },
]

export function LeftRail() {
  return (
    <div className="flex flex-col gap-0.5 border-r border-d365-border bg-[#F3F2F1] py-2">
      {icons.map((it, i) => (
        <div
          key={i}
          className={`relative grid h-11 w-12 cursor-pointer place-items-center text-[18px] ${
            it.active ? 'text-d365-blue' : 'text-d365-ink-2'
          }`}
        >
          {it.active && (
            <span className="absolute bottom-2 left-0 top-2 w-[3px] bg-d365-blue" />
          )}
          {it.glyph}
        </div>
      ))}
    </div>
  )
}
