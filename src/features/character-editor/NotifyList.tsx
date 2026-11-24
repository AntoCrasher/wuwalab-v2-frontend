import { Fragment } from 'react'
import type { PathNotify } from '@/lib/adminTypes'
import { frames } from '@/lib/gameFormat'
import { EmptyNote, NotifySummary, shortClass } from '@/ui'

export function NotifyList({ notifies }: { notifies: PathNotify[] }) {
  if (notifies.length === 0) {
    return <EmptyNote>No notifies of this kind on this path.</EmptyNote>
  }
  return (
    <div className="panel-grid panel-notifies">
      <span className="panel-head num">Frame</span>
      <span className="panel-head num">Lasts</span>
      <span className="panel-head">Notify</span>
      <span className="panel-head">What it does</span>
      {notifies.map((notify) => (
        <Fragment key={`${notify.at}-${notify.position}`}>
          <span className="num">{frames(notify.at)}</span>
          <span className="num wl-dim">{notify.duration === 0 ? '-' : frames(notify.duration)}</span>
          <span>{shortClass(notify.notifyClass)}</span>
          <NotifySummary notify={notify} />
        </Fragment>
      ))}
    </div>
  )
}
