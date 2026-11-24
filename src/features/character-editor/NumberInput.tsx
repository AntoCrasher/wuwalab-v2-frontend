type Props = { value: number; label: string; onChange: (value: number) => void }

export function NumberInput({ value, label, onChange }: Props) {
  return (
    <input
      className="inline-input"
      type="number"
      step="any"
      aria-label={label}
      value={value}
      onChange={(event) => {
        const next = event.target.valueAsNumber
        if (!Number.isNaN(next)) {
          onChange(next)
        }
      }}
    />
  )
}
