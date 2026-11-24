import type { AdminCharacter } from '@/lib/adminTypes'
import { EmptyNote, LoadGate, PageHeader, useJson } from '@/ui'
import { CharacterCard } from './CharacterCard'

export function CharacterEditorPage() {
  const loaded = useJson<AdminCharacter[]>('/api/admin/characters')

  return (
    <div className="container">
      <PageHeader kicker="Admin · Game data" title="Character Editor">
        Every imported character and its abilities: the path of montages each one plays and what they do.
      </PageHeader>
      <LoadGate loaded={loaded}>
        {(characters) => (
          <>
            <span className="ce-tally">
              {characters.length} {characters.length === 1 ? 'character' : 'characters'}
            </span>
            <div className="ce-list">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            {characters.length === 0 && <EmptyNote>No characters imported yet.</EmptyNote>}
          </>
        )}
      </LoadGate>
    </div>
  )
}
