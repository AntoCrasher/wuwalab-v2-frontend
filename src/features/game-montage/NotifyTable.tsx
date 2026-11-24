import { frames } from '@/lib/gameFormat'
import type { Notify } from '@/lib/gameTypes'
import { EmptyNote, Table, pixel, proportional, type TableColumn } from '@/ui'
import { NotifySummary } from './NotifySummary'
import { shortClass } from './notifyFormat'

type Row = Notify & Record<string, unknown>

const COLUMNS: TableColumn<Row>[] = [
  {
    key: 'time',
    header: 'Frame',
    width: pixel(80),
    align: 'end',
    renderCell: (notify) => <span className="wl-mono">{frames(notify.time)}</span>,
  },
  {
    key: 'duration',
    header: 'Lasts',
    width: pixel(80),
    align: 'end',
    renderCell: (notify) => (
      <span className="wl-mono wl-dim">{notify.duration === 0 ? '-' : frames(notify.duration)}</span>
    ),
  },
  {
    key: 'seconds',
    header: 'Seconds',
    width: pixel(90),
    align: 'end',
    renderCell: (notify) => <span className="wl-mono wl-dim">{notify.time}</span>,
  },
  {
    key: 'notifyClass',
    header: 'Notify',
    width: proportional(2),
    renderCell: (notify) => <span className="wl-mono">{shortClass(notify.notifyClass)}</span>,
  },
  {
    key: 'params',
    header: 'What it does',
    width: proportional(5),
    renderCell: (notify) => <NotifySummary notify={notify} />,
  },
]

export function NotifyTable({ notifies }: { notifies: Notify[] }) {
  if (notifies.length === 0) {
    return <EmptyNote>No notifies of this kind.</EmptyNote>
  }
  return <Table<Row> data={notifies as Row[]} columns={COLUMNS} idKey="position" density="compact" hasHover />
}
