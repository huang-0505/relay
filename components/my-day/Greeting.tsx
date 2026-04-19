import { GREETING } from '@/lib/mock-data'

export function Greeting() {
  return (
    <div className="border-b border-d365-border bg-white px-10 pb-5 pt-6">
      <div className="mono mb-1.5 text-xs text-d365-ink-3">{GREETING.time}</div>
      <h1 className="serif text-[30px] font-normal leading-[1.1] tracking-[-0.02em] text-d365-ink">
        {GREETING.title}
        <em className="italic text-d365-blue">{GREETING.titleEm}</em>
        {GREETING.titleTail}
      </h1>
      <div className="mt-1.5 text-[13px] text-d365-ink-2">{GREETING.sub}</div>
    </div>
  )
}
