import { useState, type DragEvent, type HTMLAttributes } from 'react'
import type { AbilitySummary } from '@/lib/adminTypes'
import { sendJson } from '@/lib/api'
import { toastError } from '@/ui'

type RowDrag = HTMLAttributes<HTMLDivElement> & { draggable: boolean }

export function movedOrder(ids: number[], dragged: number, target: number): number[] {
  const from = ids.indexOf(dragged)
  const to = ids.indexOf(target)
  if (from < 0 || to < 0 || from === to) {
    return ids
  }
  const next = ids.filter((id) => id !== dragged)
  next.splice(to, 0, dragged)
  return next
}

export function useReorder(characterId: number, abilities: AbilitySummary[], onChanged: () => void) {
  const [dragged, setDragged] = useState<number | null>(null)
  const [over, setOver] = useState<number | null>(null)

  function drop(target: number) {
    const ids = abilities.map((ability) => ability.id)
    const next = dragged === null ? ids : movedOrder(ids, dragged, target)
    setDragged(null)
    setOver(null)
    if (next !== ids) {
      sendJson('PUT', `/api/admin/characters/${characterId}/ability-order`, { ids: next })
        .then(onChanged)
        .catch((failure: unknown) => toastError('Could not save the order', failure))
    }
  }

  function rowDrag(id: number): RowDrag {
    return {
      draggable: true,
      onDragStart: (event: DragEvent) => {
        event.dataTransfer.effectAllowed = 'move'
        setDragged(id)
      },
      onDragOver: (event: DragEvent) => {
        event.preventDefault()
        setOver(id)
      },
      onDrop: (event: DragEvent) => {
        event.preventDefault()
        drop(id)
      },
      onDragEnd: () => {
        setDragged(null)
        setOver(null)
      },
    }
  }

  return { rowDrag, over: dragged === null ? null : over }
}
