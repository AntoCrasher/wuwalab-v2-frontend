import { createElement } from 'react'
import type { useToast } from '@astryxdesign/core/Toast'
import { ToastCard } from './ToastCard'

export type ToastKind = 'success' | 'error'
type ToastMessage = { kind: ToastKind; title: string; message?: string }
type Show = ReturnType<typeof useToast>

const SUCCESS_MS = 4000

let show: Show | null = null
const waiting: ToastMessage[] = []

function draw(toast: ToastMessage, showToast: Show): void {
  const stays = toast.kind === 'error'
  showToast({
    type: stays ? 'error' : 'info',
    body: toast.title,
    isAutoHide: !stays,
    ...(stays ? {} : { autoHideDuration: SUCCESS_MS }),
    renderContent: ({ dismiss }) => createElement(ToastCard, { ...toast, onClose: dismiss }),
  })
}

function notify(toast: ToastMessage): void {
  if (show === null) {
    waiting.push(toast)
    return
  }
  draw(toast, show)
}

export function toastSuccess(title: string): void {
  notify({ kind: 'success', title })
}

export function toastError(title: string, error: unknown): void {
  notify({ kind: 'error', title, message: error instanceof Error ? error.message : String(error) })
}

export function attachToasts(showToast: Show | null): void {
  show = showToast
  if (showToast !== null) {
    waiting.splice(0).forEach((toast) => draw(toast, showToast))
  }
}
