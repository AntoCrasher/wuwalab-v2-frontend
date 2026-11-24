import { LEAVE_KINDS, type StepDraft } from '@/lib/abilityDraft'
import type { Skill } from '@/lib/gameTypes'
import { Button, GridNumber, GridSelect } from '@/ui'
import { LeavePoint } from './LeavePoint'
import { StepSource } from './StepSource'

type Props = {
  index: number
  step: StepDraft
  skills: Skill[]
  onChange: (step: StepDraft) => void
  onRemove: () => void
}

const SECOND_STEP = 0.01
const LEAVE_OPTIONS = [
  { value: 'end', label: 'its end' },
  { value: 'notify', label: 'a notify' },
  { value: 'time', label: 'a time' },
]

export function StepEditor({ index, step, skills, onChange, onRemove }: Props) {
  function pickLeave(kind: string) {
    const leaveKind = LEAVE_KINDS.find((candidate) => candidate === kind)
    if (leaveKind !== undefined) {
      onChange({ ...step, leaveKind, leaveNotify: null, leaveTime: null })
    }
  }

  return (
    <div className="edit-step">
      <span>{index + 1}</span>
      <StepSource step={step} skills={skills} onChange={onChange} />
      <Button variant="ghost" size="sm" label="Remove" onClick={onRemove} />
      <div className="edit-step-leave">
        <span className="ce-label">Left at</span>
        <GridSelect label="Left at" value={step.leaveKind} options={LEAVE_OPTIONS} onChange={pickLeave} />
        <LeavePoint step={step} onChange={onChange} />
        <span className="ce-label">Next starts (s)</span>
        <GridNumber
          label="Next starts at seconds"
          step={SECOND_STEP}
          value={step.nextStart}
          onChange={(nextStart) => onChange({ ...step, nextStart })}
        />
      </div>
    </div>
  )
}
