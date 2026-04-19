import type { ReactNode } from 'react'
import { AppBar } from './AppBar'
import { LeftRail } from './LeftRail'
import { NavPanel } from './NavPanel'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppBar />
      <div className="grid h-[calc(100vh-48px)] grid-cols-[48px_220px_1fr]">
        <LeftRail />
        <NavPanel />
        <main className="overflow-y-auto bg-d365-bg">{children}</main>
      </div>
    </div>
  )
}
