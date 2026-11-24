type Props = { label: string; value: string; onChange: (color: string) => void }

/** Astryx has no color picker: v1's editors use the native swatch for this one field too. */
export function ColorField({ label, value, onChange }: Props) {
  return (
    <span className="ce-color-row">
      <input
        type="color"
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="wl-mono-dim">{value}</span>
    </span>
  )
}
