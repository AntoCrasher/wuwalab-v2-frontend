import { useSearchParams } from 'react-router-dom'
import type { Montage } from '@/lib/gameTypes'
import { AdminBack, AdminPage, LoadGate, useJson } from '@/ui'
import { MontageView } from './MontageView'

export function MontagePage() {
  const [search] = useSearchParams()
  const key = search.get('key') ?? ''
  const montage = useJson<Montage>(`/api/game/montage?key=${encodeURIComponent(key)}`)

  return (
    <AdminPage>
      <AdminBack to="/admin/abilities" label="Character Editor" />
      <LoadGate loaded={montage}>{(data) => <MontageView montage={data} key={data.assetKey} />}</LoadGate>
    </AdminPage>
  )
}
