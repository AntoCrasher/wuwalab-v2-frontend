import { Chip, TextInput } from '@/ui'

type Props = {
  filter: string
  reordering: boolean
  onFilter: (filter: string) => void
  onReordering: (reordering: boolean) => void
}

export function LedgerBar({ filter, reordering, onFilter, onReordering }: Props) {
  return (
    <div className="ability-filter-bar">
      <TextInput
        label="Filter abilities"
        isLabelHidden
        size="sm"
        width="100%"
        value={reordering ? '' : filter}
        isDisabled={reordering}
        placeholder="Filter abilities…"
        onChange={(next) => onFilter(next)}
      />
      <Chip
        label="Reorder"
        title="Drag rows to change their order"
        isOn={reordering}
        onToggle={() => onReordering(!reordering)}
      />
    </div>
  )
}
