import { useEffect } from 'react'
import { useToast } from '@astryxdesign/core/Toast'
import { attachToasts } from './toast'

export function ToastBridge() {
  const showToast = useToast()

  useEffect(() => {
    attachToasts(showToast)
    return () => attachToasts(null)
  }, [showToast])

  return null
}
