import type { StepDraft } from '@/lib/abilityDraft'
import { GridNumber } from '@/ui'
import { LeaveNotifySelect } from './LeaveNotifySelect'

const SECOND_STEP = 0.01

export function LeavePoint({ step, onChange }: { step: StepDraft; onChange: (step: StepDraft) => void }) {
  if (step.montageKey === null) {
    return <span className="wl-dim">no montage: plays nothing</span>
  }
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
      <GridNumber
        label="Leave at seconds"
        step={SECOND_STEP}
        value={step.leaveTime ?? 0}
        onChange={(leaveTime) => onChange({ ...step, leaveTime })}
      />
    )
  }
  return <span className="wl-dim">plays to the end</span>
}
