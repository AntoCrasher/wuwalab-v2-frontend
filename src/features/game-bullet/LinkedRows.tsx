import { frames } from '@/lib/gameFormat'
import type { Bullet } from '@/lib/gameTypes'
import { EmptyNote, Link } from '@/ui'

export function LinkedRows({ bullet }: { bullet: Bullet }) {
  if (bullet.children.length === 0 && bullet.buffs.length === 0) {
    return <EmptyNote>No child bullets and no buffs on hit.</EmptyNote>
  }
  return (
    <div className="wl-facts">
      {bullet.children.map((child) => (
        <div className="wl-fact" key={`child-${child.position}`}>
          <dt>
            child <Link href={`/admin/game/bullet/${child.childId}`}>{child.childId}</Link>
          </dt>
          <dd>
            after {frames(child.delay)}, x{child.childCount}, trigger {child.triggerType}
          </dd>
        </div>
      ))}
      {bullet.buffs.map((buff) => (
        <div className="wl-fact" key={`buff-${buff.position}`}>
          <dt>
            buff <Link href={`/admin/game/row/buff/${buff.buffId}`}>{buff.buffId}</Link>
          </dt>
          <dd>to {buff.target}</dd>
        </div>
      ))}
    </div>
  )
}
