import { plain } from '@/lib/gameFormat'
import type { Damage } from '@/lib/gameTypes'
import { EmptyNote, Link, Table, pixel, proportional, type TableColumn } from '@/ui'

type Row = Damage & Record<string, unknown>

const PERCENT_UNITS = 100

function rate(damage: Damage): string {
  const first = damage.rateLv?.[0]
  return first === undefined ? '-' : `${first / PERCENT_UNITS}%`
}

const COLUMNS: TableColumn<Row>[] = [
  {
    key: 'id',
    header: 'Damage id',
    width: pixel(130),
    renderCell: (damage) => (
      <span className="wl-mono">
        <Link href={`/game/row/damage/${damage.id}`}>{damage.id}</Link>
      </span>
    ),
  },
  {
    key: 'element',
    header: 'Element',
    width: pixel(80),
    align: 'end',
    renderCell: (damage) => plain(damage.element),
  },
  {
    key: 'damageType',
    header: 'Type',
    width: pixel(70),
    align: 'end',
    renderCell: (damage) => plain(damage.damageType),
  },
  { key: 'rateLv', header: 'Multiplier lv 1', width: proportional(1), align: 'end', renderCell: rate },
  {
    key: 'energy',
    header: 'Energy',
    width: proportional(1),
    align: 'end',
    renderCell: (damage) => plain(damage.energy?.[0]),
  },
  {
    key: 'toughLv',
    header: 'Toughness',
    width: proportional(1),
    align: 'end',
    renderCell: (damage) => plain(damage.toughLv?.[0]),
  },
]

export function DamageTable({ damages }: { damages: Damage[] }) {
  if (damages.length === 0) {
    return <EmptyNote>This bullet deals no damage.</EmptyNote>
  }
  return <Table<Row> data={damages as Row[]} columns={COLUMNS} idKey="id" density="compact" hasHover />
}
