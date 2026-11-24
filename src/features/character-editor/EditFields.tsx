import type { AbilityDraft } from '@/lib/abilityDraft'
import { LANGUAGES, type Language } from '@/lib/adminTypes'
import { GridSelect, GridText } from '@/ui'

type Props = { draft: AbilityDraft; onChange: (patch: Partial<AbilityDraft>) => void }

const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  jp: 'Japanese',
  cn: 'Chinese',
  kr: 'Korean',
}
const DRAFT_OPTIONS = [
  { value: 'draft', label: 'draft' },
  { value: 'confirmed', label: 'confirmed' },
]

export function EditFields({ draft, onChange }: Props) {
  return (
    <>
      <div className="edit-field">
        <span className="ce-label">Names</span>
        <div className="edit-names">
          {LANGUAGES.map((language) => (
            <GridText
              key={language}
              label={`${LANGUAGE_LABELS[language]} name`}
              placeholder={LANGUAGE_LABELS[language]}
              value={draft.names[language]}
              onChange={(name) => onChange({ names: { ...draft.names, [language]: name } })}
            />
          ))}
        </div>
      </div>
      <div className="edit-field edit-draft">
        <span className="ce-label">Draft</span>
        <GridSelect
          label="Draft"
          value={draft.isDraft ? 'draft' : 'confirmed'}
          options={DRAFT_OPTIONS}
          onChange={(state) => onChange({ isDraft: state === 'draft' })}
        />
      </div>
    </>
  )
}
