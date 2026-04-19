import type { ProductFit } from '@/lib/types'

interface ProductBlockProps {
  tag: string
  products: ProductFit[]
}

export function ProductBlock({ tag, products }: ProductBlockProps) {
  return (
    <div className="mb-8">
      <div className="mb-3.5 flex items-center justify-between border-b border-d365-border pb-2.5">
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-lenovo-red">
          {tag}
        </div>
        <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-d365-ink-2 [font-family:var(--font-serif)]">
          Recommended product fit
        </div>
      </div>
      {products.map((p) => (
        <ProductRow key={p.name} product={p} />
      ))}
    </div>
  )
}

function ProductRow({ product }: { product: ProductFit }) {
  const isTop = product.topPick === true
  const fitMedium = product.fit < 0.7

  return (
    <div
      className={`mb-2 grid grid-cols-[1fr_auto] items-center gap-[18px] rounded-md px-[18px] py-3.5 ${
        isTop
          ? 'border-[1.5px] border-lenovo-red bg-[linear-gradient(to_right,var(--color-lenovo-red-soft),white_40%)] shadow-[0_2px_8px_rgba(226,35,26,0.06)]'
          : 'border border-d365-border bg-white'
      }`}
    >
      <div>
        <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-d365-ink">
          {product.name}
          {isTop && (
            <span className="rounded-[10px] bg-lenovo-red px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-white">
              TOP PICK
            </span>
          )}
        </div>
        <div className="mt-1 text-[12.5px] leading-[1.5] text-d365-ink-2">
          {product.why}
        </div>
      </div>
      <div
        className={`mono whitespace-nowrap rounded px-3 py-1.5 text-xs font-bold ${
          fitMedium
            ? 'bg-accent-amber-soft text-accent-brown'
            : 'bg-accent-green-soft text-accent-green'
        }`}
      >
        FIT · {product.fit.toFixed(2)}
      </div>
    </div>
  )
}
