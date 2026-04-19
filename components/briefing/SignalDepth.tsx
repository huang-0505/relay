import type { SignalDepth as SignalDepthType, SignalItem } from '@/lib/types'
import { RichText } from './RichText'

interface SignalDepthProps {
  data: SignalDepthType
}

export function SignalDepth({ data }: SignalDepthProps) {
  return (
    <>
      <div className="mb-3.5 border-b border-dashed border-d365-border pb-3 text-[12.5px] italic leading-[1.6] text-d365-ink-2">
        {data.intro}
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <SignalColumn
          variant="generic"
          heading="Generic view · via D365 sync"
          subhead={data.generic.subhead}
          items={data.generic.items}
        />
        <SignalColumn
          variant="relay"
          heading="Relay view · via Marketo API"
          subhead={data.relay.subhead}
          items={data.relay.items}
        />
      </div>
    </>
  )
}

interface SignalColumnProps {
  variant: 'generic' | 'relay'
  heading: string
  subhead: string
  items: SignalItem[]
}

function SignalColumn({
  variant,
  heading,
  subhead,
  items,
}: SignalColumnProps) {
  return (
    <div className="rounded-md border border-marketo-purple/15 bg-white px-4 py-3.5">
      <div
        className={`mb-2 border-b border-d365-border pb-2 text-[10px] font-bold uppercase tracking-[0.1em] ${
          variant === 'relay' ? 'text-lenovo-red' : 'text-d365-ink-3'
        }`}
      >
        {heading}
      </div>
      <div className="mb-2.5 text-[10.5px] italic text-d365-ink-3">
        {subhead}
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-[14px_1fr] items-start gap-2 text-xs leading-[1.4] ${
              variant === 'relay' ? 'text-d365-ink' : 'text-d365-ink-2'
            }`}
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                variant === 'relay' ? 'bg-lenovo-red' : 'bg-d365-ink-3'
              }`}
            />
            <span>
              <RichText text={item.text} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
