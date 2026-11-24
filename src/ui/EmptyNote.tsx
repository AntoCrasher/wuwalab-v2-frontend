import type { ReactNode } from 'react'

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="wl-empty">{children}</p>
}
