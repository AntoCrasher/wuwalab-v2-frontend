import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { Badge } from '@/ui'
import { AbilityEditForm } from './AbilityEditForm'
import { AbilityPanel } from './AbilityPanel'
import { Chevron } from './Chevron'
import { RowActions } from './RowActions'

type Mode = 'closed' | 'open' | 'edit'
type Props = { characterId: number; ability: AbilitySummary; onChanged: () => void }

function dim(text: string | number | null) {
  return text === null || text === 0 ? <span className="dim">-</span> : text
}

export function AbilityRow({ characterId, ability, onChanged }: Props) {
  const [mode, setMode] = useState<Mode>('closed')
  const [revision, setRevision] = useState(0)

  function saved() {
    setRevision((was) => was + 1)
    setMode('open')
    onChanged()
  }

  return (
    <div>
      <div
        className={mode === 'closed' ? 'ability-grid-row' : 'ability-grid-row is-open'}
        onClick={() => setMode((was) => (was === 'closed' ? 'open' : was === 'open' ? 'closed' : was))}
      >
        <div className="atd atd-expand">
          <Chevron />
        </div>
        <div className="atd atd-name">
          {ability.name}
          {ability.isDraft && <Badge label="Draft" variant="warning" />}
        </div>
        <div className="atd">{dim(ability.abilityType)}</div>
        <div className="atd">{ability.steps}</div>
        <div className="atd">{dim(ability.hitNotifies)}</div>
        <div className="atd atd-frames">{frames(ability.length)}</div>
        <div className="atd">{ability.firstHit === null ? dim(null) : frames(ability.firstHit)}</div>
        <div className="atd">{dim(ability.cooldown)}</div>
        <div className="atd">{ability.priority ?? dim(null)}</div>
        <div className="atd dim">{ability.skillId ?? '-'}</div>
        <RowActions
          abilityId={ability.id}
          name={ability.name}
          onEdit={() => setMode('edit')}
          onDeleted={onChanged}
        />
      </div>
      {mode === 'open' && <AbilityPanel abilityId={ability.id} revision={revision} />}
      {mode === 'edit' && (
        <AbilityEditForm
          characterId={characterId}
          abilityId={ability.id}
          revision={revision}
          onSaved={saved}
          onCancel={() => setMode('open')}
        />
      )}
    </div>
  )
}
