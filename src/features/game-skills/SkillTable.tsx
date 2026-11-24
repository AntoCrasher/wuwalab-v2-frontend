import { frames, montagePath } from '@/lib/gameFormat'
import type { Skill } from '@/lib/gameTypes'
import { EmptyNote, Link, Table, pixel, proportional, type TableColumn } from '@/ui'

type Row = Skill & Record<string, unknown>

const COLUMNS: TableColumn<Row>[] = [
  {
    key: 'id',
    header: 'Id',
    width: pixel(90),
    renderCell: (skill) => <span className="wl-mono">{skill.id}</span>,
  },
  { key: 'name', header: 'Game name', width: proportional(2), renderCell: (skill) => skill.name },
  { key: 'genre', header: 'Genre', width: pixel(60), align: 'end', renderCell: (skill) => skill.genre },
  {
    key: 'interruptLevel',
    header: 'Priority',
    width: pixel(70),
    align: 'end',
    renderCell: (skill) => skill.interruptLevel,
  },
  {
    key: 'cooldownTime',
    header: 'Cooldown',
    width: pixel(80),
    align: 'end',
    renderCell: (skill) =>
      skill.cooldownTime === 0 ? <span className="wl-dim">-</span> : `${skill.cooldownTime} s`,
  },
  {
    key: 'blueprint',
    header: 'Blueprint',
    width: proportional(2),
    renderCell: (skill) => <span className="wl-mono wl-dim">{skill.blueprint ?? '-'}</span>,
  },
  {
    key: 'montages',
    header: 'Montages',
    width: proportional(4),
    renderCell: (skill) => <Montages skill={skill} />,
  },
]

function Montages({ skill }: { skill: Skill }) {
  return (
    <span className="wl-mono">
      {skill.montages.map((montage, index) => (
        <span key={montage.assetKey}>
          {index > 0 && <span className="wl-dim"> · </span>}
          <Link href={montagePath(montage.assetKey)}>{montage.name ?? montage.assetKey}</Link>
          {montage.length !== undefined && <span className="wl-dim"> {frames(montage.length)}</span>}
        </span>
      ))}
    </span>
  )
}

export function SkillTable({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) {
    return <EmptyNote>This character has no imported skills.</EmptyNote>
  }
  return <Table<Row> data={skills as Row[]} columns={COLUMNS} idKey="id" density="compact" hasHover />
}
