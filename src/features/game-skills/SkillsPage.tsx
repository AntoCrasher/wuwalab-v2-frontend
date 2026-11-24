import { useParams } from 'react-router-dom'
import type { GameCharacter, Skill } from '@/lib/gameTypes'
import { LoadGate, PageHeader, useJson } from '@/ui'
import { CharacterSwitch } from './CharacterSwitch'
import { SkillTable } from './SkillTable'

export function SkillsPage() {
  const { characterId = '' } = useParams()
  const characters = useJson<GameCharacter[]>('/api/game/characters')
  const skills = useJson<Skill[]>(`/api/game/characters/${characterId}/skills`)

  return (
    <main className="wl-page">
      <PageHeader kicker="Game data" title={`Character ${characterId}`}>
        Skills as the game has them. Open a montage to see its notifies.
      </PageHeader>
      <LoadGate loaded={characters}>
        {(list) => <CharacterSwitch characters={list} current={characterId} />}
      </LoadGate>
      <LoadGate loaded={skills}>{(list) => <SkillTable skills={list} />}</LoadGate>
    </main>
  )
}
