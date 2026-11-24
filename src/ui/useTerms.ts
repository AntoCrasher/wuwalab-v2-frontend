import { use } from 'react'
import { findTerm, type Term, type TermListKey } from '@/lib/terms'
import { TermsContext, type TermsValue } from './termsContext'

export function useTerms(): TermsValue {
  return use(TermsContext)
}

export function useTerm(list: TermListKey, id: number | null | undefined): Term | null {
  const { lists } = use(TermsContext)
  return id === null || id === undefined ? null : findTerm(lists, list, id)
}
