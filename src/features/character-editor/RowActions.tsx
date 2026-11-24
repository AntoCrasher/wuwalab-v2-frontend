import { useState, type MouseEvent } from 'react'
import { sendJson } from '@/lib/api'
import { Button } from '@/ui'

type Props = { abilityId: number; onEdit: () => void; onDeleted: () => void }

export function RowActions({ abilityId, onEdit, onDeleted }: Props) {
  const [confirming, setConfirming] = useState(false)

  function edit(event: MouseEvent) {
    event.stopPropagation()
    onEdit()
  }

  function remove(event: MouseEvent) {
    event.stopPropagation()
    if (!confirming) {
      setConfirming(true)
      return
    }
    void sendJson('DELETE', `/api/admin/abilities/${abilityId}`).then(onDeleted)
  }

  return (
    <div className="atd atd-actions" onMouseLeave={() => setConfirming(false)}>
      <Button variant="ghost" size="sm" label="Edit" onClick={edit} />
      <Button variant="destructive" size="sm" label={confirming ? 'Sure?' : 'Delete'} onClick={remove} />
    </div>
  )
}
