import { useState, type CSSProperties, type ReactNode } from 'react'

type Props = { color: string; name: string; tags?: ReactNode; count: ReactNode; children: ReactNode }

export function EditorCard({ color, name, tags, count, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <section
      className={open ? 'ce-card is-open' : 'ce-card'}
      style={{ '--char-color': color } as CSSProperties}
    >
      <button type="button" className="ce-head" onClick={() => setOpen((was) => !was)} aria-expanded={open}>
        <span className="ce-chev" aria-hidden="true">
          {open ? '▾' : '▸'}
        </span>
        <span className="ce-name ce-name-col">{name}</span>
        {tags}
        <span className="ce-count">{count}</span>
      </button>
      {open && <div className="ce-body">{children}</div>}
    </section>
  )
}
