'use client'

import { useState, type ReactNode } from 'react'

interface CollapseSectionProps {
  label: string
  hint?: string
  defaultOpen?: boolean
  variant?: 'default' | 'signal-depth'
  children: ReactNode
}

export function CollapseSection({
  label,
  hint,
  defaultOpen = false,
  variant = 'default',
  children,
}: CollapseSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  const wrapperCls =
    variant === 'signal-depth'
      ? 'mb-2 mt-6 border-t border-dashed border-d365-border-strong pt-5'
      : 'mb-2'

  const toggleCls =
    variant === 'signal-depth'
      ? 'bg-paper border-d365-border'
      : 'bg-white border-d365-border hover:bg-[#F9F8F7] hover:border-d365-border-strong'

  return (
    <div className={wrapperCls}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md border px-4 py-3 text-left transition-all ${toggleCls}`}
      >
        <span
          className="w-3 text-xs text-d365-ink-3 transition-transform duration-[250ms]"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▸
        </span>
        <span
          className={`text-[13.5px] tracking-[-0.01em] text-d365-ink ${
            variant === 'signal-depth'
              ? 'font-medium text-d365-ink-2'
              : 'font-semibold'
          }`}
        >
          {label}
        </span>
        {hint && (
          <span className="ml-auto text-xs italic text-d365-ink-3">{hint}</span>
        )}
      </button>
      <div
        className="-mt-px overflow-hidden rounded-b-md border-b border-l border-r border-d365-border bg-paper transition-[max-height,padding] duration-[350ms] ease-out"
        style={{
          maxHeight: open
            ? variant === 'signal-depth'
              ? '1200px'
              : '800px'
            : '0px',
          padding: open ? '16px 18px 18px' : '0 18px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
