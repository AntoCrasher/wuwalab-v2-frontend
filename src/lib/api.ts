const NO_CONTENT = 204

async function failure(path: string, response: Response): Promise<Error> {
  const body: unknown = await response.json().catch(() => null)
  if (typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string') {
    return new Error(body.error)
  }
  return new Error(`${path} answered ${response.status}`)
}

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal: signal ?? null, headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw await failure(path, response)
  }
  return (await response.json()) as T
}

export async function sendJson<T>(
  method: 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: body === undefined ? null : JSON.stringify(body),
  })
  if (!response.ok) {
    throw await failure(path, response)
  }
  return (response.status === NO_CONTENT ? undefined : await response.json()) as T
}
