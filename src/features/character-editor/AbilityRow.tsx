import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { AbilityCells } from './AbilityCells'
import { AbilityEditForm } from './AbilityEditForm'
import { AbilityPanel } from './AbilityPanel'
import { Chevron } from './Chevron'
import { RowActions } from './RowActions'

type Mode = 'closed' | 'open' | 'edit'
type Props = { characterId: number; ability: AbilitySummary; onChanged: () => void }

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
        <AbilityCells ability={ability} />
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
