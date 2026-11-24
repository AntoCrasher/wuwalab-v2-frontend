import { useState } from 'react'
import { frames, seconds } from '@/lib/gameFormat'
import type { Montage } from '@/lib/gameTypes'
import { Facts, PageHeader, Tab, TabList } from '@/ui'
import { NotifyTable } from './NotifyTable'
import { KINDS, KIND_LABELS, type Kind } from './notifyFormat'

export function MontageView({ montage }: { montage: Montage }) {
  const [kind, setKind] = useState<Kind>('hit')
  const count = (wanted: Kind) => montage.notifies.filter((notify) => notify.kind === wanted).length

  return (
    <>
      <PageHeader kicker="Montage" title={montage.name}>
        {montage.assetKey}
      </PageHeader>
      <Facts
        facts={[
          { label: 'Length', value: `${frames(montage.length)}  (${seconds(montage.length)})` },
          { label: 'Blend in', value: montage.blendIn === null ? 'default' : seconds(montage.blendIn) },
          { label: 'Blend out', value: montage.blendOut === null ? 'default' : seconds(montage.blendOut) },
          { label: 'Notifies', value: montage.notifies.length },
        ]}
      />
      <TabList value={kind} onChange={(next) => setKind(next as Kind)} size="sm">
        {KINDS.map((key) => (
          <Tab
            key={key}
            value={key}
            label={KIND_LABELS[key]}
            endContent={<span className="wl-chip-n">{count(key)}</span>}
          />
        ))}
      </TabList>
      <NotifyTable notifies={montage.notifies.filter((notify) => notify.kind === kind)} />
    </>
  )
}
