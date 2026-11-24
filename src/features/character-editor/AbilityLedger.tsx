import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { sendJson } from '@/lib/api'
import { Button, EmptyNote, TextInput, toastError } from '@/ui'
import { AbilityRow } from './AbilityRow'
import './abilityLedger.css'

const HEADERS = [
  '',
  'Name',
  'Type',
  'Steps',
  'Hits',
  'Length',
  'First hit',
  'Cooldown',
  'Priority',
  'Skill',
  ' ',
]

type Props = { characterId: number; abilities: AbilitySummary[]; onChanged: () => void }

export function AbilityLedger({ characterId, abilities, onChanged }: Props) {
  const [filter, setFilter] = useState('')
  const wanted = filter.trim().toLowerCase()
  const shown = abilities.filter((ability) => ability.name.toLowerCase().includes(wanted))

  function add() {
    sendJson('POST', `/api/admin/characters/${characterId}/abilities`, { name: 'New ability' })
      .then(onChanged)
      .catch((failure: unknown) => toastError('Could not add the ability', failure))
  }

  return (
    <>
      <div className="ability-filter-bar">
        <TextInput
          label="Filter abilities"
          isLabelHidden
          size="sm"
          width="100%"
          value={filter}
          placeholder="Filter abilities…"
          onChange={(next) => setFilter(next)}
        />
      </div>
      <div className="ability-section">
        <div className="ability-grid-row ath-row">
          {HEADERS.map((label, index) => (
            <div key={label} className={index === 1 ? 'ath ath-name' : 'ath'}>
              {label}
            </div>
          ))}
        </div>
        {shown.map((ability) => (
          <AbilityRow key={ability.id} characterId={characterId} ability={ability} onChanged={onChanged} />
        ))}
        {shown.length === 0 && <EmptyNote>No ability matches that.</EmptyNote>}
        <div className="ability-add-row">
          <Button variant="ghost" size="sm" label="+ Ability" onClick={add} />
        </div>
      </div>
    </>
  )
}
