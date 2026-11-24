const FPS = 60

export function frames(time: number): string {
  return `${(time * FPS).toFixed(1)}f`
}

export function seconds(value: number): string {
  return `${Number(value.toFixed(4))} s`
}

export function montagePath(assetKey: string): string {
  return `/game/montage?key=${encodeURIComponent(assetKey)}`
}

export function plain(value: unknown): string {
  if (value === null || value === undefined) {
    return '-'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}
