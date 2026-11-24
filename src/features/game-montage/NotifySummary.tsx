import type { Notify } from '@/lib/gameTypes'
import { Link } from '@/ui'
import { buffId, bulletIds, paramsOf, scalars, tagName } from './notifyFormat'

export function NotifySummary({ notify }: { notify: Notify }) {
  const params = paramsOf(notify)
  const bullets = bulletIds(params)
  const buff = buffId(params)
  const tag = tagName(params)
  const priority = params['Priority']

  if (bullets.length === 0 && buff === null && tag === null && priority === undefined) {
    return <span className="wl-mono wl-dim">{scalars(params)}</span>
  }
  return (
    <span className="wl-mono">
      {bullets.map((id) => (
        <span key={id}>
          <span className="wl-dim">bullet </span>
          <Link href={`/game/bullet/${id}`}>{id}</Link>{' '}
        </span>
      ))}
      {buff !== null && (
        <span>
          <span className="wl-dim">buff </span>
          <Link href={`/game/row/buff/${buff}`}>{buff}</Link>{' '}
        </span>
      )}
      {tag !== null && <span>{tag} </span>}
      {priority !== undefined && <span className="wl-dim">priority {String(priority)}</span>}
    </span>
  )
}
