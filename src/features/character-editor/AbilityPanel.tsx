import { useState } from 'react'
import type { AbilityDetail } from '@/lib/adminTypes'
import { KINDS, KIND_LABELS, LoadGate, Tab, TabList, useJson, type Kind } from '@/ui'
import { HitsTab } from './HitsTab'
import { NotifyList } from './NotifyList'
import { PathTab } from './PathTab'

type PanelTab = 'path' | Kind

function PanelBody({ ability }: { ability: AbilityDetail }) {
  const [tab, setTab] = useState<PanelTab>('path')
  const notifies = ability.path.flatMap((step) => step.notifies)
  const count = (kind: Kind) => notifies.filter((notify) => notify.kind === kind).length

  return (
    <>
      <TabList value={tab} onChange={(next) => setTab(next as PanelTab)} size="sm">
        <Tab
          value="path"
          label="Path"
          endContent={<span className="wl-chip-n">{ability.path.length}</span>}
        />
        {KINDS.map((kind) => (
          <Tab
            key={kind}
            value={kind}
            label={KIND_LABELS[kind]}
            endContent={<span className="wl-chip-n">{count(kind)}</span>}
          />
        ))}
      </TabList>
      {tab === 'path' && <PathTab ability={ability} />}
      {tab === 'hit' && <HitsTab notifies={notifies.filter((notify) => notify.kind === 'hit')} />}
      {tab !== 'path' && tab !== 'hit' && (
        <NotifyList notifies={notifies.filter((notify) => notify.kind === tab)} />
      )}
    </>
  )
}

export function AbilityPanel({ abilityId }: { abilityId: number }) {
  const loaded = useJson<AbilityDetail>(`/api/admin/abilities/${abilityId}`)

  return (
    <div className="ability-panel">
      <LoadGate loaded={loaded}>{(ability) => <PanelBody ability={ability} />}</LoadGate>
    </div>
  )
}
