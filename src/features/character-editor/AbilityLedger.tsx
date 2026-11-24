import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { EmptyNote } from '@/ui'
import { AbilityRow } from './AbilityRow'
import './abilityLedger.css'

const HEADERS = ['', 'Name', 'Type', 'Steps', 'Hits', 'Length', 'First hit', 'Cooldown', 'Priority', 'Skill']

export function AbilityLedger({ abilities }: { abilities: AbilitySummary[] }) {
  const [filter, setFilter] = useState('')
  const wanted = filter.trim().toLowerCase()
  const shown = abilities.filter((ability) => ability.name.toLowerCase().includes(wanted))

  return (
    <>
      <div className="ability-filter-bar">
        <input
          className="ability-filter"
          value={filter}
          placeholder="Filter abilities…"
          onChange={(event) => setFilter(event.target.value)}
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
          <AbilityRow key={ability.id} ability={ability} />
        ))}
        {shown.length === 0 && <EmptyNote>No ability matches that.</EmptyNote>}
      </div>
    </>
  )
}
