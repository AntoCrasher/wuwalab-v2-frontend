import type { ReactNode } from 'react'

export type Fact = { label: string; value: ReactNode }

export function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="wl-facts">
      {facts.map((fact) => (
        <div className="wl-fact" key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
