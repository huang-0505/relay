import { Fragment, type ReactNode } from 'react'
import type { Briefing } from '@/lib/types'
import { AccountContext } from './AccountContext'
import { BriefTag } from './BriefTag'
import { CollapseSection } from './CollapseSection'
import { FactGrid } from './FactGrid'
import { MqlTriggerBand } from './MqlTriggerBand'
import { ProductBlock } from './ProductBlock'
import { RichText } from './RichText'
import { SignalDepth } from './SignalDepth'
import { SKELETON_SECTIONS } from './SkeletonBlocks'
import { SourcesBlock } from './SourcesBlock'
import { StreamingReveal } from './StreamingReveal'
import { TalkPoints } from './TalkPoints'
import { WhyDownloaded } from './WhyDownloaded'

export type BriefingRenderState = 'skeleton' | 'streaming' | 'ready'

interface BriefingMainProps {
  briefing: Briefing | null
  renderState: BriefingRenderState
}

const REAL_STAGGER_MS = 400
const SKELETON_STAGGER_MS = 500

export function BriefingMain({ briefing, renderState }: BriefingMainProps) {
  // Skeleton path: render 8 grey-placeholder sections, staggered top-down
  // over ~4s. No briefing required — this is what shows while the API is
  // still working.
  if (renderState === 'skeleton') {
    return (
      <div className="mx-auto w-full max-w-[820px] px-[60px] pb-16 pt-10">
        <StreamingReveal staggerMs={SKELETON_STAGGER_MS}>
          {SKELETON_SECTIONS.map((node, i) => (
            <Fragment key={i}>{node}</Fragment>
          ))}
        </StreamingReveal>
      </div>
    )
  }

  // Real content paths — briefing must be present. `streaming` wraps in
  // StreamingReveal for the section-by-section fade-in; `ready` is a
  // plain passthrough (instant render for cache hits).
  if (!briefing) return null

  const sections = buildRealSections(briefing)
  const Wrapper = renderState === 'streaming' ? StreamingReveal : Passthrough

  return (
    <div className="mx-auto w-full max-w-[820px] px-[60px] pb-16 pt-10">
      <Wrapper staggerMs={REAL_STAGGER_MS}>
        {sections.map((node, i) => (
          <Fragment key={i}>{node}</Fragment>
        ))}
      </Wrapper>
    </div>
  )
}

function Passthrough({ children }: { children: ReactNode; staggerMs?: number }) {
  return <>{children}</>
}

function buildRealSections(briefing: Briefing): ReactNode[] {
  return [
    <section key="head">
      <BriefTag generatedMinutesAgo={briefing.generatedMinutesAgo} />
      <p className="serif mb-8 border-b border-d365-border pb-6 text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-d365-ink">
        {briefing.headline}
      </p>
    </section>,

    <section key="summary">
      <div className="mb-3.5 border-b border-d365-border pb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-d365-ink-2 [font-family:var(--font-serif)]">
        Lead summary
      </div>
      <p className="mb-[18px] text-[14.5px] leading-[1.7] text-d365-ink">
        <RichText text={briefing.summary} />
      </p>
    </section>,

    <section key="mql">
      <MqlTriggerBand trigger={briefing.mqlTrigger} />
    </section>,

    <section key="facts" className="mb-9">
      <FactGrid facts={briefing.facts} />
    </section>,

    <section key="products">
      <ProductBlock tag={briefing.productsTag} products={briefing.products} />
    </section>,

    <section key="talk">
      <CollapseSection
        label="Three talk points for the first call"
        hint="Open with Aidoc · frame CMIO · probe Dell"
        defaultOpen
      >
        <TalkPoints points={briefing.talkPoints} />
      </CollapseSection>
    </section>,

    <section key="collapsed">
      <CollapseSection
        label="Account context"
        hint="Meridian · 3 hospitals · Aidoc partnership"
      >
        <AccountContext paragraphs={briefing.accountContext} />
      </CollapseSection>
      <CollapseSection
        label="Why she downloaded the paper"
        hint="Signal · Role · Timing · Risk"
      >
        <WhyDownloaded cards={briefing.whyDownloaded} />
      </CollapseSection>
      <CollapseSection
        label="Signal depth · audit trail"
        hint="What Relay read from Marketo"
        variant="signal-depth"
      >
        <SignalDepth data={briefing.signalDepth} />
      </CollapseSection>
    </section>,

    <section key="sources">
      <SourcesBlock sources={briefing.sources} count={briefing.sourcesCount} />
    </section>,
  ]
}
