import { Badge } from '@astryxdesign/core/Badge'
import { tone, type TermListKey } from '@/lib/terms'
import { useTerm } from './useTerms'

type Props = { list: TermListKey; id: number | null | undefined }

export function TermBadge({ list, id }: Props) {
  const term = useTerm(list, id)
  if (id === null || id === undefined) {
    return <span className="wl-dim">-</span>
  }
  if (term === null) {
    return <Badge label={String(id)} />
  }
  return <Badge label={term.name} style={tone(term.color)} />
}
