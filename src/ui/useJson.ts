import { useEffect, useState } from 'react'
import { getJson } from '@/lib/api'

export type Loaded<T> =
  { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; path: string; data: T }

export function useJson<T>(path: string): Loaded<T> {
  const [loaded, setLoaded] = useState<Loaded<T>>({ state: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    getJson<T>(path, controller.signal)
      .then((data) => setLoaded({ state: 'ready', path, data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setLoaded({ state: 'error', message: error instanceof Error ? error.message : String(error) })
        }
      })
    return () => controller.abort()
  }, [path])

  return loaded.state === 'ready' && loaded.path !== path ? { state: 'loading' } : loaded
}
