import type { AbilityDraft } from '@/lib/abilityDraft'
import { GridNumber, GridSelect, GridText } from '@/ui'

type Props = { draft: AbilityDraft; onChange: (patch: Partial<AbilityDraft>) => void }

const DRAFT_OPTIONS = [
  { value: 'draft', label: 'draft' },
  { value: 'confirmed', label: 'confirmed' },
]

export function EditFields({ draft, onChange }: Props) {
  return (
    <div className="edit-fields">
      <div className="edit-field">
        <span className="ce-label">Name</span>
        <GridText label="Name" value={draft.name} onChange={(name) => onChange({ name })} />
      </div>
      <div className="edit-field">
        <span className="ce-label">Order</span>
        <GridNumber label="Order" value={draft.sortIndex} onChange={(sortIndex) => onChange({ sortIndex })} />
      </div>
      <div className="edit-field">
        <span className="ce-label">Draft</span>
        <GridSelect
          label="Draft"
          value={draft.isDraft ? 'draft' : 'confirmed'}
          options={DRAFT_OPTIONS}
          onChange={(state) => onChange({ isDraft: state === 'draft' })}
        />
      </div>
    </div>
  )
}
