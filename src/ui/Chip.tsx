import { ToggleButton } from '@astryxdesign/core/ToggleButton'

type Props = { label: string; isOn: boolean; onToggle: () => void; title?: string }

export function Chip({ label, isOn, onToggle, title }: Props) {
  return (
    <ToggleButton
      size="sm"
      label={label}
      isPressed={isOn}
      onPressedChange={onToggle}
      {...(title === undefined ? {} : { tooltip: title })}
    >
      {label}
    </ToggleButton>
  )
}
