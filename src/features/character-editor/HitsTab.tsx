import { Fragment } from 'react'
import type { PathNotify } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { EmptyNote } from '@/ui'
import { BulletLine } from './BulletLine'

export function HitsTab({ notifies }: { notifies: PathNotify[] }) {
  if (notifies.length === 0) {
    return <EmptyNote>No hit notifies on this path.</EmptyNote>
  }
  return (
    <div className="panel-grid panel-hits">
      <span className="panel-head num">Frame</span>
      <span className="panel-head">Bullet, its hits and its damage rows</span>
      {notifies.map((notify) => (
        <Fragment key={`${notify.at}-${notify.position}`}>
          <span className="num">{frames(notify.at)}</span>
          <span>
            {notify.bullets.map((bullet) => (
              <BulletLine key={bullet.id} bullet={bullet} />
            ))}
            {notify.bullets.length === 0 && <span className="wl-dim">no bullet id on this notify</span>}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
