import { useNavigate } from 'react-router-dom'
import type { GameCharacter } from '@/lib/gameTypes'
import { SegmentedControl, SegmentedControlItem } from '@/ui'

export function CharacterSwitch({ characters, current }: { characters: GameCharacter[]; current: string }) {
  const navigate = useNavigate()

  return (
    <div className="wl-bar">
      <SegmentedControl
        label="Character"
        size="sm"
        value={current}
        onChange={(id) => void navigate(`/game/${id}`)}
      >
        {characters.map((character) => (
          <SegmentedControlItem
            key={character.id}
            value={String(character.id)}
            label={`${character.id} ${character.folder.split('/').at(-1) ?? ''}`}
          />
        ))}
      </SegmentedControl>
    </div>
  )
}
