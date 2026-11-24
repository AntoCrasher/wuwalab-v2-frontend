import type { SwapDraft } from '@/lib/abilityDraft'
import { frames } from '@/lib/gameFormat'
import { NumberInput } from './NumberInput'

type Props = { label: string; value: SwapDraft; steps: number; onChange: (value: SwapDraft) => void }

export function SwapBlockEditor({ label, value, steps, onChange }: Props) {
  return (
    <>
      <span className="ce-label">{label}</span>
      <select
        className="inline-select"
        aria-label={`${label} set`}
        value={value === null ? 'none' : 'set'}
        onChange={(event) => onChange(event.target.value === 'none' ? null : { step: 0, time: 0 })}
      >
        <option value="none">none</option>
        <option value="set" disabled={steps === 0}>
          set
        </option>
      </select>
      {value === null ? (
        <span className="wl-dim">-</span>
      ) : (
        <select
          className="inline-select"
          aria-label={`${label} step`}
          value={value.step}
          onChange={(event) => onChange({ ...value, step: Number(event.target.value) })}
        >
          {Array.from({ length: steps }, (_, step) => (
            <option key={step} value={step}>
              step {step + 1}
            </option>
          ))}
        </select>
      )}
      {value === null ? (
        <span className="wl-dim">-</span>
      ) : (
        <NumberInput
          label={`${label} seconds`}
          value={value.time}
          onChange={(time) => onChange({ ...value, time })}
        />
      )}
      <span className="wl-dim">{value === null ? '' : `${frames(value.time)} into that step's montage`}</span>
    </>
  )
}
