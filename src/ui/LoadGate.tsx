import type { ReactNode } from 'react'
import { EmptyNote } from './EmptyNote'
import type { Loaded } from './useJson'

export function LoadGate<T>({ loaded, children }: { loaded: Loaded<T>; children: (data: T) => ReactNode }) {
  if (loaded.state === 'loading') {
    return <EmptyNote>Loading…</EmptyNote>
  }
  if (loaded.state === 'error') {
    return <EmptyNote>Could not load: {loaded.message}</EmptyNote>
  }
  return <>{children(loaded.data)}</>
}
