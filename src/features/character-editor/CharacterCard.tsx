import type { ReactNode } from 'react'
import type { AdminCharacter } from '@/lib/adminTypes'
import { EditorCard, Link, TermBadge, useTerm } from '@/ui'
import { AbilityLedger } from './AbilityLedger'

const FALLBACK_COLOR = 'var(--accent)'

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
  const element = useTerm('element', character.element)

  return (
    <EditorCard
      color={element?.color ?? FALLBACK_COLOR}
      name={folder}
      tags={
        <>
          <TermBadge list="element" id={character.element} />
          <TermBadge list="weapon_type" id={character.weaponType} />
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
