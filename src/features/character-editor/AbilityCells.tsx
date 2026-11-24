import type { AbilitySummary } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { Badge, TermBadge } from '@/ui'

function dim(text: string | number | null) {
  return text === null || text === 0 ? <span className="dim">-</span> : text
}

export function AbilityCells({ ability }: { ability: AbilitySummary }) {
  return (
    <>
      <div className="atd atd-name">
        <span className="atd-name-text">{ability.name}</span>
        {ability.isDraft && <Badge label="Draft" variant="warning" />}
      </div>
      <div className="atd">
        <TermBadge list="skill_genre" id={ability.genre} />
      </div>
      <div className="atd">{ability.steps}</div>
      <div className="atd">{dim(ability.hitNotifies)}</div>
      <div className="atd atd-frames">{frames(ability.length)}</div>
      <div className="atd">{ability.firstHit === null ? dim(null) : frames(ability.firstHit)}</div>
      <div className="atd">{dim(ability.cooldown)}</div>
      <div className="atd">{ability.priority ?? dim(null)}</div>
      <div className="atd dim">{ability.skillId ?? '-'}</div>
    </>
  )
}
