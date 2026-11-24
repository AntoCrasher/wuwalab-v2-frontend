import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BulletPage } from '@/features/game-bullet/BulletPage'
import { MontagePage } from '@/features/game-montage/MontagePage'
import { RowPage } from '@/features/game-row/RowPage'
import { SkillsPage } from '@/features/game-skills/SkillsPage'
import { CharacterEditorPage } from '@/features/character-editor/CharacterEditorPage'
import { AstryxRoot } from '@/ui'

const FIRST_PAGE = '/admin/abilities'

export function App() {
  return (
    <BrowserRouter>
      <AstryxRoot>
        <Routes>
          <Route path="/" element={<Navigate to={FIRST_PAGE} replace />} />
          <Route path="/admin/abilities" element={<CharacterEditorPage />} />
          <Route path="/admin/game/montage" element={<MontagePage />} />
          <Route path="/admin/game/bullet/:bulletId" element={<BulletPage />} />
          <Route path="/admin/game/row/:kind/:rowId" element={<RowPage />} />
          <Route path="/admin/game/:characterId" element={<SkillsPage />} />
        </Routes>
      </AstryxRoot>
    </BrowserRouter>
  )
}
