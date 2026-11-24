import type { HTMLAttributes } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { AbilityCells } from './AbilityCells'

type Props = { ability: AbilitySummary; drag: HTMLAttributes<HTMLDivElement>; isOver: boolean }

export function ReorderRow({ ability, drag, isOver }: Props) {
  return (
    <div
      className={isOver ? 'ability-grid-row is-reordering is-drop-target' : 'ability-grid-row is-reordering'}
      {...drag}
    >
      <div className="atd atd-expand ability-grip" aria-hidden="true">
        ⋮⋮
      </div>
      <AbilityCells ability={ability} />
      <div className="atd" />
    </div>
  )
}
