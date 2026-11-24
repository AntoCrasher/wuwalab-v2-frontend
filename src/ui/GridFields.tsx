import { NumberInput } from '@astryxdesign/core/NumberInput'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Select } from './Select'

export type GridOption = { value: string; label: string }

type TextProps = { label: string; value: string; onChange: (value: string) => void; placeholder?: string }

export function GridText({ label, value, onChange, placeholder }: TextProps) {
  return (
    <span className="gf">
      <TextInput
        label={label}
        isLabelHidden
        size="sm"
        width="100%"
        value={value}
        onChange={(next) => onChange(next)}
        {...(placeholder === undefined ? {} : { placeholder })}
      />
    </span>
  )
}

type NumberProps = { label: string; value: number; onChange: (value: number) => void; step?: number }

export function GridNumber({ label, value, onChange, step }: NumberProps) {
  return (
    <span className="gf">
      <NumberInput
        label={label}
        isLabelHidden
        size="sm"
        width="100%"
        value={value}
        step={step ?? null}
        onChange={(next) => {
          if (next !== null) {
            onChange(next)
          }
        }}
      />
    </span>
  )
}

type SelectProps = {
  label: string
  value: string
  options: readonly GridOption[]
  onChange: (value: string) => void
}

export function GridSelect({ label, value, options, onChange }: SelectProps) {
  return (
    <span className="gf">
      <Select
        label={label}
        isLabelHidden
        size="sm"
        width="100%"
        options={[...options]}
        value={value}
        onChange={onChange}
      />
    </span>
  )
}
