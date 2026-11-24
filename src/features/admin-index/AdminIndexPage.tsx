import { AdminPage, ClickableCard, PageHeader } from '@/ui'
import './adminIndex.css'

const TILES = [
  {
    href: '/admin/abilities',
    title: 'Character Editor',
    desc: 'Characters and their abilities: the path of montages each one plays, its hits and its swap blocks.',
  },
  {
    href: '/admin/colors',
    title: 'Colors',
    desc: 'The color of every element, weapon type, damage type, subtype, scaling and skill genre.',
  },
  {
    href: '/admin/game/1501',
    title: 'Game data',
    desc: 'Imported skills, montages, bullets, damage rows and buffs, exactly as the game has them.',
  },
]

export function AdminIndexPage() {
  return (
    <AdminPage>
      <PageHeader kicker="Admin" title="Admin">
        Editors and game data.
      </PageHeader>
      <div className="ai-grid">
        {TILES.map((tile) => (
          <ClickableCard key={tile.href} label={tile.title} href={tile.href} padding={4}>
            <span className="ai-title">{tile.title}</span>
            <span className="ai-desc">{tile.desc}</span>
          </ClickableCard>
        ))}
      </div>
    </AdminPage>
  )
}
