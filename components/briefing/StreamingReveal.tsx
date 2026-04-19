'use client'

import { Children, useEffect, useState, type ReactNode } from 'react'

interface StreamingRevealProps {
  children: ReactNode
  staggerMs: number
}

export function StreamingReveal({ children, staggerMs }: StreamingRevealProps) {
  const childArray = Children.toArray(children)
  const total = childArray.length
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    // Schedule the staggered reveal. This effect runs once on mount —
    // the component is remounted by its parent whenever streaming mode
    // flips, so we never need to reset state mid-life.
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < total; i += 1) {
      const delay = i === 0 ? 0 : i * staggerMs
      const id = setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1))
      }, delay)
      timers.push(id)
    }
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [total, staggerMs])

  return (
    <>
      {childArray.map((child, i) => {
        const visible = i < visibleCount
        return (
          <div
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition:
                'opacity 350ms ease-out, transform 350ms ease-out',
              willChange: visible ? undefined : 'opacity, transform',
            }}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
