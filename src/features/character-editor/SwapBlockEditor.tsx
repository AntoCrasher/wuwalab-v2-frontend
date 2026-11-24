import type { SwapDraft } from '@/lib/abilityDraft'
import { frames } from '@/lib/gameFormat'
import { GridNumber, GridSelect } from '@/ui'

type Props = { label: string; value: SwapDraft; steps: number; onChange: (value: SwapDraft) => void }

const SECOND_STEP = 0.01
const NONE = 'none'

export function SwapBlockEditor({ label, value, steps, onChange }: Props) {
  const stepOptions = Array.from({ length: steps }, (_, step) => ({
    value: String(step),
    label: `step ${step + 1}`,
  }))

  return (
    <>
      <span className="ce-label">{label}</span>
      <GridSelect
        label={`${label} step`}
        value={value === null ? NONE : String(value.step)}
        options={[{ value: NONE, label: 'none' }, ...stepOptions]}
        onChange={(step) => onChange(step === NONE ? null : { step: Number(step), time: value?.time ?? 0 })}
      />
      {value === null ? (
        <span className="wl-dim">-</span>
      ) : (
        <GridNumber
          label={`${label} seconds`}
          step={SECOND_STEP}
          value={value.time}
          onChange={(time) => onChange({ ...value, time })}
        />
      )}
      <span className="wl-dim">{value === null ? '' : `${frames(value.time)} into that step's montage`}</span>
    </>
  )
}
