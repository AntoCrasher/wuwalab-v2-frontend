import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { sendJson } from '@/lib/api'
import { Button, EmptyNote, toastError } from '@/ui'
import { AbilityRow } from './AbilityRow'
import { LedgerBar } from './LedgerBar'
import { ReorderRow } from './ReorderRow'
import './abilityLedger.css'
import { useReorder } from './useReorder'

const HEADERS = ['Name', 'Genre', 'Steps', 'Hits', 'Length', 'First hit', 'Cooldown', 'Priority', 'Skill']

type Props = { characterId: number; abilities: AbilitySummary[]; onChanged: () => void }

export function AbilityLedger({ characterId, abilities, onChanged }: Props) {
  const [filter, setFilter] = useState('')
  const [reordering, setReordering] = useState(false)
  const { rowDrag, over } = useReorder(characterId, abilities, onChanged)
  const wanted = reordering ? '' : filter.trim().toLowerCase()
  const shown = abilities.filter((ability) => ability.name.toLowerCase().includes(wanted))

  function add() {
    sendJson('POST', `/api/admin/characters/${characterId}/abilities`, { name: 'New ability' })
      .then(onChanged)
      .catch((failure: unknown) => toastError('Could not add the ability', failure))
  }

  return (
    <>
      <LedgerBar filter={filter} reordering={reordering} onFilter={setFilter} onReordering={setReordering} />
      <div className="ability-section">
        <div className="ability-grid-row ath-row">
          <div className="ath" />
          {HEADERS.map((label) => (
            <div key={label} className={label === 'Name' ? 'ath ath-name' : 'ath'}>
              {label}
            </div>
          ))}
          <div className="ath" />
        </div>
        {shown.map((ability) =>
          reordering ? (
            <ReorderRow
              key={ability.id}
              ability={ability}
              drag={rowDrag(ability.id)}
              isOver={over === ability.id}
            />
          ) : (
            <AbilityRow key={ability.id} characterId={characterId} ability={ability} onChanged={onChanged} />
          ),
        )}
        {shown.length === 0 && <EmptyNote>No ability matches that.</EmptyNote>}
        <div className="ability-add-row">
          <Button variant="ghost" size="sm" label="+ Ability" onClick={add} />
        </div>
      </div>
    </>
  )
}
