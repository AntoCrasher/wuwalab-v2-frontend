import { frames, montagePath } from '@/lib/gameFormat'
import type { Montage } from '@/lib/gameTypes'
import { shortClass, useJson } from '@/ui'

type Props = { montageKey: string; value: number | null; onChange: (position: number) => void }

export function LeaveNotifySelect({ montageKey, value, onChange }: Props) {
  const loaded = useJson<Montage>(montagePath(montageKey).replace('/admin/game/', '/api/game/'))
  if (loaded.state !== 'ready') {
    return <span className="wl-dim">{loaded.state === 'error' ? loaded.message : 'Loading…'}</span>
  }
  return (
    <select
      className="inline-select"
      aria-label="Leave at notify"
      value={value ?? ''}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      <option value="" disabled>
        pick a notify
      </option>
      {loaded.data.notifies.map((notify) => (
        <option key={notify.position} value={notify.position}>
          {frames(notify.time)} {shortClass(notify.notifyClass)} #{notify.position}
        </option>
      ))}
    </select>
  )
}
