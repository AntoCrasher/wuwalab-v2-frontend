import { ABILITY_TYPES, type AbilityDraft } from '@/lib/abilityDraft'
import { NumberInput } from './NumberInput'

type Props = { draft: AbilityDraft; onChange: (patch: Partial<AbilityDraft>) => void }

export function EditFields({ draft, onChange }: Props) {
  return (
    <div className="edit-fields">
      <label className="edit-field">
        <span className="ce-label">Name</span>
        <input
          className="inline-input"
          value={draft.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </label>
      <label className="edit-field">
        <span className="ce-label">Type</span>
        <select
          className="inline-select"
          value={draft.abilityType ?? ''}
          onChange={(event) =>
            onChange({ abilityType: event.target.value === '' ? null : event.target.value })
          }
        >
          <option value="">not set</option>
          {ABILITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="edit-field">
        <span className="ce-label">Order</span>
        <NumberInput
          label="Order"
          value={draft.sortIndex}
          onChange={(sortIndex) => onChange({ sortIndex })}
        />
      </label>
      <label className="edit-field">
        <span className="ce-label">Draft</span>
        <select
          className="inline-select"
          value={draft.isDraft ? 'draft' : 'confirmed'}
          onChange={(event) => onChange({ isDraft: event.target.value === 'draft' })}
        >
          <option value="draft">draft</option>
          <option value="confirmed">confirmed</option>
        </select>
      </label>
    </div>
  )
}
