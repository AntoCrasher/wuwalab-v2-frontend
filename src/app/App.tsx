import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminIndexPage } from '@/features/admin-index/AdminIndexPage'
import { CharacterEditorPage } from '@/features/character-editor/CharacterEditorPage'
import { BulletPage } from '@/features/game-bullet/BulletPage'
import { MontagePage } from '@/features/game-montage/MontagePage'
import { RowPage } from '@/features/game-row/RowPage'
import { SkillsPage } from '@/features/game-skills/SkillsPage'
import { AstryxRoot } from '@/ui'

export function App() {
  return (
    <BrowserRouter>
      <AstryxRoot>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminIndexPage />} />
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
