import type { ReactNode } from 'react'
import type { AdminCharacter } from '@/lib/adminTypes'
import { Badge, EditorCard, Link } from '@/ui'
import { AbilityLedger } from './AbilityLedger'

const CARD_COLOR = 'var(--accent)'

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="ce-stat">
      <span className="ce-label">{label}</span>
      <span className="ce-stat-v">{children}</span>
    </span>
  )
}

export function CharacterCard({
  character,
  onChanged,
}: {
  character: AdminCharacter
  onChanged: () => void
}) {
  const folder = character.folder.split('/').at(-1) ?? character.folder

  return (
    <EditorCard
      color={CARD_COLOR}
      name={folder}
      tags={
        <>
          <Badge label={`Element ${character.element}`} />
          <Badge label={`Weapon ${character.weaponType}`} />
        </>
      }
      count={`${character.abilities.length} abilities`}
    >
      <div className="ce-summary">
        <Stat label="Id">{character.id}</Stat>
        <Stat label="Folder">{folder}</Stat>
        <Stat label="Snapshot">{character.snapshot}</Stat>
        <Stat label="Game data">
          <Link href={`/admin/game/${character.id}`}>skills</Link>
        </Stat>
      </div>
      <AbilityLedger characterId={character.id} abilities={character.abilities} onChanged={onChanged} />
    </EditorCard>
  )
}
