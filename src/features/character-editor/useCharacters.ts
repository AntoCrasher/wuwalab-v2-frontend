import { useCallback, useEffect, useState } from 'react'
import type { AdminCharacter } from '@/lib/adminTypes'
import { getJson } from '@/lib/api'
import type { Loaded } from '@/ui'

const PATH = '/api/admin/characters'

export function useCharacters(): { loaded: Loaded<AdminCharacter[]>; reload: () => void } {
  const [loaded, setLoaded] = useState<Loaded<AdminCharacter[]>>({ state: 'loading' })

  const reload = useCallback(() => {
    getJson<AdminCharacter[]>(PATH)
      .then((data) => setLoaded({ state: 'ready', path: PATH, data }))
      .catch((error: unknown) =>
        setLoaded({ state: 'error', message: error instanceof Error ? error.message : String(error) }),
      )
  }, [])

  useEffect(reload, [reload])

  return { loaded, reload }
}
