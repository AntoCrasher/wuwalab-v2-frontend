import type { StepDraft } from '@/lib/abilityDraft'
import { LeaveNotifySelect } from './LeaveNotifySelect'
import { NumberInput } from './NumberInput'

export function LeavePoint({ step, onChange }: { step: StepDraft; onChange: (step: StepDraft) => void }) {
  if (step.leaveKind === 'notify') {
    return (
      <LeaveNotifySelect
        montageKey={step.montageKey}
        value={step.leaveNotify}
        onChange={(leaveNotify) => onChange({ ...step, leaveNotify })}
      />
    )
  }
  if (step.leaveKind === 'time') {
    return (
      <NumberInput
        label="Leave at seconds"
        value={step.leaveTime ?? 0}
        onChange={(leaveTime) => onChange({ ...step, leaveTime })}
      />
    )
  }
  return <span className="wl-dim">plays to the end</span>
}
