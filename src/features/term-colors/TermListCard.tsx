import type { TermList } from '@/lib/terms'
import { EditorCard } from '@/ui'
import { TermRow } from './TermRow'

const CARD_COLOR = 'var(--accent)'
const HEADERS = ['Id', 'Name', 'Shown as', 'Color', '']

export function TermListCard({ list }: { list: TermList }) {
  return (
    <EditorCard color={CARD_COLOR} name={list.name} count={`${list.terms.length} terms`}>
      <div className="term-grid">
        {HEADERS.map((label) => (
          <span key={label} className="term-head">
            {label}
          </span>
        ))}
        {list.terms.map((term) => (
          <TermRow key={term.id} list={list.list} term={term} />
        ))}
      </div>
    </EditorCard>
  )
}
