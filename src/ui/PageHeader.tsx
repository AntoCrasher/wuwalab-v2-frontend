import type { ReactNode } from 'react'

export function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="wl-page-head">
      <span className="wl-kicker">{kicker}</span>
      <h1>{title}</h1>
      {children !== undefined && <p>{children}</p>}
    </header>
  )
}
