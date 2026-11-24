import type { MouseEvent } from 'react'
import { sendJson } from '@/lib/api'
import { Button, confirmDialog, toastError } from '@/ui'

type Props = { abilityId: number; name: string; onEdit: () => void; onDeleted: () => void }

export function RowActions({ abilityId, name, onEdit, onDeleted }: Props) {
  function edit(event: MouseEvent) {
    event.stopPropagation()
    onEdit()
  }

  async function remove(event: MouseEvent) {
    event.stopPropagation()
    const confirmed = await confirmDialog({
      title: `Delete ${name}?`,
      message: 'Its path and swap blocks are deleted with it. The game data it points at is untouched.',
      confirmLabel: 'Delete',
      danger: true,
    })
    if (confirmed) {
      sendJson('DELETE', `/api/admin/abilities/${abilityId}`)
        .then(onDeleted)
        .catch((failure: unknown) => toastError('Could not delete the ability', failure))
    }
  }

  return (
    <div className="atd atd-actions">
      <Button variant="ghost" size="sm" label="Edit" onClick={edit} />
      <Button variant="destructive" size="sm" label="Delete" onClick={(event) => void remove(event)} />
    </div>
  )
}
