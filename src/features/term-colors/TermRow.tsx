import { useState } from 'react'
import { sendJson } from '@/lib/api'
import { tone, type Term, type TermList, type TermListKey } from '@/lib/terms'
import { Badge, Button, ColorField, HStack, toastError, toastSuccess, useTerms } from '@/ui'

export function TermRow({ list, term }: { list: TermListKey; term: Term }) {
  const { setLists } = useTerms()
  const [color, setColor] = useState(term.color)

  function save(next: string | null) {
    sendJson<TermList[]>('PUT', `/api/admin/terms/${list}/${term.id}`, { color: next })
      .then((lists) => {
        setLists(lists)
        setColor(next ?? term.defaultColor)
        toastSuccess(`${term.name} ${next === null ? 'reset' : 'saved'}`)
      })
      .catch((failure: unknown) => toastError('Could not save the color', failure))
  }

  return (
    <>
      <span className="wl-dim">{term.id}</span>
      <span>{term.name}</span>
      <span>
        <Badge label={term.name} style={tone(color)} />
      </span>
      <ColorField label={`${term.name} color`} value={color} onChange={setColor} />
      <HStack gap={1} justify="end">
        {color !== term.color && (
          <Button variant="primary" size="sm" label="Save" onClick={() => save(color)} />
        )}
        {term.color !== term.defaultColor && (
          <Button variant="ghost" size="sm" label="Reset" onClick={() => save(null)} />
        )}
      </HStack>
    </>
  )
}
