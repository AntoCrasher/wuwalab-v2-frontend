import { useState } from 'react'
import { draftOf, type AbilityDraft } from '@/lib/abilityDraft'
import type { AbilityDetail } from '@/lib/adminTypes'
import { sendJson } from '@/lib/api'
import type { Skill } from '@/lib/gameTypes'
import { Button } from '@/ui'
import { EditFields } from './EditFields'
import { StepsEditor } from './StepsEditor'
import { SwapBlockEditor } from './SwapBlockEditor'

type Props = { ability: AbilityDetail; skills: Skill[]; onSaved: () => void; onCancel: () => void }

export function EditBody({ ability, skills, onSaved, onCancel }: Props) {
  const [draft, setDraft] = useState<AbilityDraft>(() => draftOf(ability))
  const [error, setError] = useState('')
  const patch = (change: Partial<AbilityDraft>) => setDraft((was) => ({ ...was, ...change }))

  function save() {
    sendJson('PUT', `/api/admin/abilities/${ability.id}`, draft)
      .then(onSaved)
      .catch((failure: unknown) => setError(failure instanceof Error ? failure.message : String(failure)))
  }

  return (
    <div className="edit-form">
      <EditFields draft={draft} onChange={patch} />
      <StepsEditor steps={draft.steps} skills={skills} onChange={(steps) => patch({ steps })} />
      <div className="edit-swaps">
        <SwapBlockEditor
          label="Hard swap block"
          value={draft.hardSwap}
          steps={draft.steps.length}
          onChange={(hardSwap) => patch({ hardSwap })}
        />
        <SwapBlockEditor
          label="Recommended swap block"
          value={draft.recommendedSwap}
          steps={draft.steps.length}
          onChange={(recommendedSwap) => patch({ recommendedSwap })}
        />
      </div>
      <div className="edit-actions">
        <Button variant="primary" size="sm" label="Save" onClick={save} />
        <Button variant="ghost" size="sm" label="Cancel" onClick={onCancel} />
        {error !== '' && <span className="edit-error">{error}</span>}
      </div>
    </div>
  )
}
