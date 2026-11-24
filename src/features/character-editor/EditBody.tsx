import { useState } from 'react'
import { draftOf, type AbilityDraft } from '@/lib/abilityDraft'
import type { AbilityDetail } from '@/lib/adminTypes'
import { sendJson } from '@/lib/api'
import type { Skill } from '@/lib/gameTypes'
import { Button, HStack, toastError, toastSuccess } from '@/ui'
import { EditFields } from './EditFields'
import { StepsEditor } from './StepsEditor'
import { SwapBlockEditor } from './SwapBlockEditor'

type Props = { ability: AbilityDetail; skills: Skill[]; onSaved: () => void; onCancel: () => void }

export function EditBody({ ability, skills, onSaved, onCancel }: Props) {
  const [draft, setDraft] = useState<AbilityDraft>(() => draftOf(ability))
  const patch = (change: Partial<AbilityDraft>) => setDraft((was) => ({ ...was, ...change }))

  function save() {
    sendJson('PUT', `/api/admin/abilities/${ability.id}`, draft)
      .then(() => {
        toastSuccess(`Saved ${draft.name}`)
        onSaved()
      })
      .catch((failure: unknown) => toastError('Could not save the ability', failure))
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
      <HStack gap={2}>
        <Button variant="primary" size="sm" label="Save" onClick={save} />
        <Button variant="ghost" size="sm" label="Cancel" onClick={onCancel} />
      </HStack>
    </div>
  )
}
