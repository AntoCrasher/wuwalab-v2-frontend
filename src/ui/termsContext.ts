import { createContext } from 'react'
import type { TermList } from '@/lib/terms'

export type TermsValue = { lists: TermList[]; setLists: (lists: TermList[]) => void }

export const TermsContext = createContext<TermsValue>({ lists: [], setLists: () => undefined })
