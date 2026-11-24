import { AdminBack, AdminPage, EmptyNote, LoadGate, PageHeader, Text } from '@/ui'
import { CharacterCard } from './CharacterCard'
import { useCharacters } from './useCharacters'

export function CharacterEditorPage() {
  const { loaded, reload } = useCharacters()

  return (
    <AdminPage>
      <AdminBack />
      <PageHeader kicker="Admin · Game data" title="Character Editor">
        Every imported character and its abilities: the path of montages each one plays and what they do.
      </PageHeader>
      <LoadGate loaded={loaded}>
        {(characters) => (
          <>
            <Text type="supporting">
              {characters.length} {characters.length === 1 ? 'character' : 'characters'}
            </Text>
            <div className="ce-list">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} onChanged={reload} />
              ))}
            </div>
            {characters.length === 0 && <EmptyNote>No characters imported yet.</EmptyNote>}
          </>
        )}
      </LoadGate>
    </AdminPage>
  )
}
