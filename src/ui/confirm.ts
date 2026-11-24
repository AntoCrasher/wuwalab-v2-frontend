export type ConfirmOptions = {
  title: string
  message?: string
  confirmLabel?: string
  danger?: boolean
}

export type Ask = { id: number; options: ConfirmOptions; settle: (confirmed: boolean) => void }

const queue: Ask[] = []
let nextId = 0
let redraw: (() => void) | null = null

export function confirmDialog(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    queue.push({
      id: nextId++,
      options,
      settle: (confirmed) => {
        queue.shift()
        redraw?.()
        resolve(confirmed)
      },
    })
    if (queue.length === 1) {
      redraw?.()
    }
  })
}

export function currentAsk(): Ask | undefined {
  return queue[0]
}

export function onAskChange(listener: (() => void) | null): void {
  redraw = listener
}
