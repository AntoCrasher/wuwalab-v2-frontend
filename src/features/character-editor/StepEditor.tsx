import { LEAVE_KINDS, type LeaveKind, type StepDraft } from '@/lib/abilityDraft'
import type { Skill } from '@/lib/gameTypes'
import { Button } from '@/ui'
import { LeavePoint } from './LeavePoint'
import { NumberInput } from './NumberInput'
import { StepSource } from './StepSource'

type Props = {
  index: number
  step: StepDraft
  skills: Skill[]
  onChange: (step: StepDraft) => void
  onRemove: () => void
}

const LEAVE_LABELS: Record<LeaveKind, string> = { end: 'its end', notify: 'a notify', time: 'a time' }

export function StepEditor({ index, step, skills, onChange, onRemove }: Props) {
  function pickLeave(kind: string) {
    const leaveKind = LEAVE_KINDS.find((candidate) => candidate === kind)
    if (leaveKind !== undefined) {
      onChange({ ...step, leaveKind, leaveNotify: null, leaveTime: null })
    }
  }

  return (
    <>
      <span>{index + 1}</span>
      <StepSource step={step} skills={skills} onChange={onChange} />
      <select
        className="inline-select"
        aria-label="Left at"
        value={step.leaveKind}
        onChange={(event) => pickLeave(event.target.value)}
      >
        {LEAVE_KINDS.map((kind) => (
          <option key={kind} value={kind}>
            {LEAVE_LABELS[kind]}
          </option>
        ))}
      </select>
      <LeavePoint step={step} onChange={onChange} />
      <NumberInput
        label="Next starts at seconds"
        value={step.nextStart}
        onChange={(nextStart) => onChange({ ...step, nextStart })}
      />
      <Button variant="ghost" size="sm" label="Remove" onClick={onRemove} />
    </>
  )
}
