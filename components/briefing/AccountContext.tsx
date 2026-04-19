import { RichText } from './RichText'

interface AccountContextProps {
  paragraphs: string[]
}

export function AccountContext({ paragraphs }: AccountContextProps) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={`text-[13.5px] leading-[1.65] text-d365-ink ${i > 0 ? 'mt-2.5' : ''}`}
        >
          <RichText text={p} />
        </p>
      ))}
    </>
  )
}
