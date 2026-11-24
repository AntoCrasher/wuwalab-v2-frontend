import { Button } from '@astryxdesign/core/Button'

type Props = { kind: 'success' | 'error'; title: string; message?: string; onClose: () => void }

export function ToastCard({ kind, title, message, onClose }: Props) {
  return (
    <div className="wl-toast" data-kind={kind}>
      <div className="wl-toast-body">
        <div className="wl-toast-title">{title}</div>
        {message !== undefined && <div className="wl-toast-text">{message}</div>}
      </div>
      <Button variant="ghost" size="sm" label="✕" className="wl-toast-close" onClick={onClose} />
    </div>
  )
}
