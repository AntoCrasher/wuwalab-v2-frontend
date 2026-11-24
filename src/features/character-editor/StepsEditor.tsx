import { firstStep, type StepDraft } from '@/lib/abilityDraft'
import type { Skill } from '@/lib/gameTypes'
import { Button } from '@/ui'
import { StepEditor } from './StepEditor'

const HEADERS = ['Step', 'Skill', 'Montage', 'Left at', 'Where', 'Next starts (s)', '']

type Props = { steps: StepDraft[]; skills: Skill[]; onChange: (steps: StepDraft[]) => void }

export function StepsEditor({ steps, skills, onChange }: Props) {
  return (
    <>
      <div className="edit-steps">
        {HEADERS.map((label) => (
          <span key={label} className="panel-head">
            {label}
          </span>
        ))}
        {steps.map((step, index) => (
          <StepEditor
            key={index}
            index={index}
            step={step}
            skills={skills}
            onChange={(next) => onChange(steps.map((old, at) => (at === index ? next : old)))}
            onRemove={() => onChange(steps.filter((_, at) => at !== index))}
          />
        ))}
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          label="+ Step"
          onClick={() => onChange([...steps, firstStep(skills)])}
        />
      </div>
    </>
  )
}
