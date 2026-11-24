import { useSearchParams } from 'react-router-dom'
import type { Montage } from '@/lib/gameTypes'
import { LoadGate, useJson } from '@/ui'
import { MontageView } from './MontageView'

export function MontagePage() {
  const [search] = useSearchParams()
  const key = search.get('key') ?? ''
  const montage = useJson<Montage>(`/api/game/montage?key=${encodeURIComponent(key)}`)

  return (
    <main className="wl-page">
      <LoadGate loaded={montage}>{(data) => <MontageView montage={data} key={data.assetKey} />}</LoadGate>
    </main>
  )
}
