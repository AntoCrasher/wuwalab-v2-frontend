import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BulletPage } from '@/features/game-bullet/BulletPage'
import { MontagePage } from '@/features/game-montage/MontagePage'
import { RowPage } from '@/features/game-row/RowPage'
import { SkillsPage } from '@/features/game-skills/SkillsPage'
import { AstryxRoot } from '@/ui'

const FIRST_CHARACTER = '/game/1501'

export function App() {
  return (
    <BrowserRouter>
      <AstryxRoot>
        <Routes>
          <Route path="/" element={<Navigate to={FIRST_CHARACTER} replace />} />
          <Route path="/game/montage" element={<MontagePage />} />
          <Route path="/game/bullet/:bulletId" element={<BulletPage />} />
          <Route path="/game/row/:kind/:rowId" element={<RowPage />} />
          <Route path="/game/:characterId" element={<SkillsPage />} />
        </Routes>
      </AstryxRoot>
    </BrowserRouter>
  )
}
