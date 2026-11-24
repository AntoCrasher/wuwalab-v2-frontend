import type { AbilityDetail } from '@/lib/adminTypes'
import type { Skill } from '@/lib/gameTypes'
import { LoadGate, useJson } from '@/ui'
import { EditBody } from './EditBody'

type Props = {
  characterId: number
  abilityId: number
  revision: number
  onSaved: () => void
  onCancel: () => void
}

export function AbilityEditForm({ characterId, abilityId, revision, onSaved, onCancel }: Props) {
  const ability = useJson<AbilityDetail>(`/api/admin/abilities/${abilityId}?v=${revision}`)
  const skills = useJson<Skill[]>(`/api/game/characters/${characterId}/skills`)

  return (
    <div className="ability-panel">
      <LoadGate loaded={ability}>
        {(detail) => (
          <LoadGate loaded={skills}>
            {(list) => <EditBody ability={detail} skills={list} onSaved={onSaved} onCancel={onCancel} />}
          </LoadGate>
        )}
      </LoadGate>
    </div>
  )
}
