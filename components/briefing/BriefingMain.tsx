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
import { SourcesBlock } from './SourcesBlock'
import { StreamingReveal } from './StreamingReveal'
import { TalkPoints } from './TalkPoints'
import { WhyDownloaded } from './WhyDownloaded'

interface BriefingMainProps {
  briefing: Briefing
  isStreaming?: boolean
}

const STAGGER_MS = 400

export function BriefingMain({ briefing, isStreaming = false }: BriefingMainProps) {
  const sections = buildSections(briefing)
  const Wrapper = isStreaming ? StreamingReveal : Passthrough

  return (
    <div className="mx-auto w-full max-w-[820px] px-[60px] pb-16 pt-10">
      <Wrapper staggerMs={STAGGER_MS}>
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

function buildSections(briefing: Briefing): ReactNode[] {
  return [
    // 1. Brief tag + headline
    <section key="head">
      <BriefTag generatedMinutesAgo={briefing.generatedMinutesAgo} />
      <p className="serif mb-8 border-b border-d365-border pb-6 text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-d365-ink">
        {briefing.headline}
      </p>
    </section>,

    // 2. Lead summary paragraph
    <section key="summary">
      <div className="mb-3.5 border-b border-d365-border pb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-d365-ink-2 [font-family:var(--font-serif)]">
        Lead summary
      </div>
      <p className="mb-[18px] text-[14.5px] leading-[1.7] text-d365-ink">
        <RichText text={briefing.summary} />
      </p>
    </section>,

    // 3. MQL trigger band
    <section key="mql">
      <MqlTriggerBand trigger={briefing.mqlTrigger} />
    </section>,

    // 4. Fact grid
    <section key="facts" className="mb-9">
      <FactGrid facts={briefing.facts} />
    </section>,

    // 5. Product block
    <section key="products">
      <ProductBlock tag={briefing.productsTag} products={briefing.products} />
    </section>,

    // 6. Talk points (open by default)
    <section key="talk">
      <CollapseSection
        label="Three talk points for the first call"
        hint="Open with Aidoc · frame CMIO · probe Dell"
        defaultOpen
      >
        <TalkPoints points={briefing.talkPoints} />
      </CollapseSection>
    </section>,

    // 7. Collapsed sections group
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

    // 8. Sources block
    <section key="sources">
      <SourcesBlock sources={briefing.sources} count={briefing.sourcesCount} />
    </section>,
  ]
}
