import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getJson } from '@/lib/api'
import type { TermList } from '@/lib/terms'
import { TermsContext } from './termsContext'
import { toastError } from './toast'

export function TermsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<TermList[]>([])

  useEffect(() => {
    getJson<TermList[]>('/api/terms')
      .then(setLists)
      .catch((failure: unknown) => toastError('Could not load the game terms', failure))
  }, [])

  const value = useMemo(() => ({ lists, setLists }), [lists])

  return <TermsContext value={value}>{children}</TermsContext>
}
