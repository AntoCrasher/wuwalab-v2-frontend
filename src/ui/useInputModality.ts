import { useEffect } from 'react'

const KEYBOARD_KEYS = ['Tab', 'Home', 'End', 'PageUp', 'PageDown']

let installed = false

/** wuwalab.css shows a list's keyboard highlight only under :root[data-input="key"]. */
export function useInputModality() {
  useEffect(() => {
    if (installed) {
      return
    }
    installed = true
    const root = document.documentElement
    root.dataset['input'] = 'pointer'
    const pointer = () => {
      root.dataset['input'] = 'pointer'
    }
    window.addEventListener(
      'keydown',
      (event) => {
        if (KEYBOARD_KEYS.includes(event.key) || event.key.startsWith('Arrow')) {
          root.dataset['input'] = 'key'
        }
      },
      true,
    )
    window.addEventListener('pointermove', pointer, true)
    window.addEventListener('pointerdown', pointer, true)
  }, [])
}
