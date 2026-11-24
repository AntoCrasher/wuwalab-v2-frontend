import { useParams } from 'react-router-dom'
import type { GameCharacter, Skill } from '@/lib/gameTypes'
import { AdminBack, AdminPage, LoadGate, PageHeader, useJson } from '@/ui'
import { CharacterSwitch } from './CharacterSwitch'
import { SkillTable } from './SkillTable'

export function SkillsPage() {
  const { characterId = '' } = useParams()
  const characters = useJson<GameCharacter[]>('/api/game/characters')
  const skills = useJson<Skill[]>(`/api/game/characters/${characterId}/skills`)

  return (
    <AdminPage>
      <AdminBack to="/admin/abilities" label="Character Editor" />
      <PageHeader kicker="Game data" title={`Character ${characterId}`}>
        Skills as the game has them. Open a montage to see its notifies.
      </PageHeader>
      <LoadGate loaded={characters}>
        {(list) => <CharacterSwitch characters={list} current={characterId} />}
      </LoadGate>
      <LoadGate loaded={skills}>{(list) => <SkillTable skills={list} />}</LoadGate>
    </AdminPage>
  )
}
