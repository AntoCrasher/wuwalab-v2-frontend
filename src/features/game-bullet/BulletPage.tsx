import { useParams } from 'react-router-dom'
import type { Bullet } from '@/lib/gameTypes'
import { AdminBack, Facts, LoadGate, PageHeader, useJson } from '@/ui'
import { DamageTable } from './DamageTable'
import { LinkedRows } from './LinkedRows'
import { shapeFacts, timingFacts } from './bulletFacts'

export function BulletPage() {
  const { bulletId = '' } = useParams()
  const loaded = useJson<Bullet>(`/api/game/bullets/${bulletId}`)

  return (
    <main className="container">
      <AdminBack to="/admin/abilities" label="Character Editor" />
      <LoadGate loaded={loaded}>
        {(bullet) => (
          <>
            <PageHeader kicker={`Bullet ${bullet.id}`} title={bullet.name}>
              {bullet.sourceTable}
            </PageHeader>
            <h2 className="wl-section-title">Hits</h2>
            <Facts facts={timingFacts(bullet)} />
            <h2 className="wl-section-title">Damage</h2>
            <DamageTable damages={bullet.damages} />
            <h2 className="wl-section-title">Children and buffs</h2>
            <LinkedRows bullet={bullet} />
            <h2 className="wl-section-title">Shape and movement</h2>
            <Facts facts={shapeFacts(bullet)} />
          </>
        )}
      </LoadGate>
    </main>
  )
}
