import type { Briefing } from '@/lib/types'
import { AccountContext } from './AccountContext'
import { BriefTag } from './BriefTag'
import { CollapseSection } from './CollapseSection'
import { LeadSummary } from './LeadSummary'
import { ProductBlock } from './ProductBlock'
import { SignalDepth } from './SignalDepth'
import { SourcesBlock } from './SourcesBlock'
import { TalkPoints } from './TalkPoints'
import { WhyDownloaded } from './WhyDownloaded'

interface BriefingMainProps {
  briefing: Briefing
}

export function BriefingMain({ briefing }: BriefingMainProps) {
  return (
    <div className="mx-auto w-full max-w-[820px] px-[60px] pb-16 pt-10">
      <BriefTag generatedMinutesAgo={briefing.generatedMinutesAgo} />

      <p className="serif mb-8 border-b border-d365-border pb-6 text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-d365-ink">
        {briefing.headline}
      </p>

      <LeadSummary briefing={briefing} />

      <ProductBlock tag={briefing.productsTag} products={briefing.products} />

      <CollapseSection
        label="Three talk points for the first call"
        hint="Open with Aidoc · frame CMIO · probe Dell"
        defaultOpen
      >
        <TalkPoints points={briefing.talkPoints} />
      </CollapseSection>

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
        hint="What Relay read from Marketo · 8 signals"
        variant="signal-depth"
      >
        <SignalDepth data={briefing.signalDepth} />
      </CollapseSection>

      <SourcesBlock sources={briefing.sources} count={briefing.sourcesCount} />
    </div>
  )
}
