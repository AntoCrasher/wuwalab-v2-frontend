import { AdminBack, AdminPage, EmptyNote, PageHeader, useTerms } from '@/ui'
import { TermListCard } from './TermListCard'
import './termColors.css'

export function TermColorsPage() {
  const { lists } = useTerms()

  return (
    <AdminPage>
      <AdminBack />
      <PageHeader kicker="Admin · Game data" title="Colors">
        The names and ids are the game's and live in the code. Only the colors are yours to change.
      </PageHeader>
      {lists.length === 0 && <EmptyNote>Loading…</EmptyNote>}
      <div className="ce-list">
        {lists.map((list) => (
          <TermListCard key={list.list} list={list} />
        ))}
      </div>
    </AdminPage>
  )
}
