import type { BulletNode } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { Link } from '@/ui'

const PERCENT_UNITS = 100

function hits(bullet: BulletNode): string {
  const perTarget = bullet.hitsPerTarget ?? 1
  if (perTarget === 1) {
    return 'hits once'
  }
  const count = perTarget < 0 ? 'repeatedly' : `${perTarget} times`
  return `hits ${count} every ${frames(bullet.hitInterval ?? 0)}`
}

function delay(bullet: BulletNode): string {
  const value = bullet.collisionDelay ?? 0
  return value < 0 ? `delay ${value}` : `delay ${frames(value)}`
}

export function BulletLine({ bullet, prefix }: { bullet: BulletNode; prefix?: string }) {
  if (bullet.missing) {
    return (
      <span className="bullet-line">
        {prefix} bullet {bullet.id} <span className="wl-dim">is not imported</span>
      </span>
    )
  }
  return (
    <>
      <span className="bullet-line">
        {prefix !== undefined && <span className="wl-dim">{prefix} </span>}
        <Link href={`/admin/game/bullet/${bullet.id}`}>{bullet.id}</Link> {bullet.name}
        <span className="wl-dim">
          {' '}
          · {delay(bullet)} · {hits(bullet)}
        </span>
        {bullet.damages.map((damage) => (
          <span key={damage.id}>
            <span className="wl-dim"> · damage </span>
            <Link href={`/admin/game/row/damage/${damage.id}`}>{damage.id}</Link>{' '}
            {damage.rateLv[0] === undefined ? '' : `${damage.rateLv[0] / PERCENT_UNITS}%`}
          </span>
        ))}
      </span>
      {bullet.children.length > 0 && (
        <span className="bullet-line bullet-children">
          {bullet.children.map((child) => (
            <BulletLine
              key={child.bullet.id}
              bullet={child.bullet}
              prefix={`after ${frames(child.delay)} x${child.count}`}
            />
          ))}
        </span>
      )}
    </>
  )
}
