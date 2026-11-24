import { useParams } from 'react-router-dom'
import { plain } from '@/lib/gameFormat'
import type { GameRow } from '@/lib/gameTypes'
import { Facts, LoadGate, PageHeader, useJson } from '@/ui'

export function RowPage() {
  const { kind = '', rowId = '' } = useParams()
  const loaded = useJson<GameRow>(`/api/game/${kind}/${rowId}`)

  return (
    <main className="wl-page">
      <LoadGate loaded={loaded}>
        {(row) => (
          <>
            <PageHeader kicker={kind} title={String(row.id)}>
              The columns the engine reads, then the row as the game has it.
            </PageHeader>
            <Facts
              facts={Object.entries(row)
                .filter(([name]) => name !== 'raw')
                .map(([name, value]) => ({ label: name, value: plain(value) }))}
            />
            <h2 className="wl-section-title">Game row</h2>
            <pre className="wl-raw">{JSON.stringify(row.raw, null, 1)}</pre>
          </>
        )}
      </LoadGate>
    </main>
  )
}
