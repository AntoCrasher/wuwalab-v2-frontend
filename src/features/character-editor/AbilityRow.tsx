import { useState } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { Badge } from '@/ui'
import { AbilityPanel } from './AbilityPanel'
import { Chevron } from './Chevron'

function dim(text: string | number | null) {
  return text === null || text === 0 ? <span className="dim">-</span> : text
}

export function AbilityRow({ ability }: { ability: AbilitySummary }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div
        className={open ? 'ability-grid-row is-open' : 'ability-grid-row'}
        onClick={() => setOpen((was) => !was)}
      >
        <div className="atd atd-expand">
          <Chevron />
        </div>
        <div className="atd atd-name">
          {ability.name}
          {ability.isDraft && <Badge label="Draft" variant="warning" />}
        </div>
        <div className="atd">{dim(ability.abilityType)}</div>
        <div className="atd">{ability.steps}</div>
        <div className="atd">{dim(ability.hitNotifies)}</div>
        <div className="atd atd-frames">{frames(ability.length)}</div>
        <div className="atd">{ability.firstHit === null ? dim(null) : frames(ability.firstHit)}</div>
        <div className="atd">{ability.cooldown === null ? dim(null) : dim(ability.cooldown)}</div>
        <div className="atd">{ability.priority ?? dim(null)}</div>
        <div className="atd dim">{ability.skillId ?? '-'}</div>
      </div>
      {open && <AbilityPanel abilityId={ability.id} />}
    </div>
  )
}
