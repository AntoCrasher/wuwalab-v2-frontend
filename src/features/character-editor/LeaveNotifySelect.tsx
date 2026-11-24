import { frames } from '@/lib/gameFormat'
import type { Montage } from '@/lib/gameTypes'
import { GridSelect, shortClass, useJson } from '@/ui'

type Props = { montageKey: string; value: number | null; onChange: (position: number) => void }

export function LeaveNotifySelect({ montageKey, value, onChange }: Props) {
  const loaded = useJson<Montage>(`/api/game/montage?key=${encodeURIComponent(montageKey)}`)
  if (loaded.state !== 'ready') {
    return <span className="wl-dim">{loaded.state === 'error' ? loaded.message : 'Loading…'}</span>
  }
  return (
    <GridSelect
      label="Leave at notify"
      value={value === null ? '' : String(value)}
      options={loaded.data.notifies.map((notify) => ({
        value: String(notify.position),
        label: `${frames(notify.time)} ${shortClass(notify.notifyClass)} #${notify.position}`,
      }))}
      onChange={(position) => onChange(Number(position))}
    />
  )
}
