import type { ReactNode } from 'react'
import { LinkProvider } from '@astryxdesign/core/Link'
import { Theme } from '@astryxdesign/core/theme'
import { ToastViewport } from '@astryxdesign/core/Toast'
import '@astryxdesign/core/astryx.css'
import './astryx/index.css'
import './ledger.css'
import './page.css'
import { DialogBridge } from './DialogBridge'
import { RouterLink } from './RouterLink'
import { TermsProvider } from './TermsProvider'
import { ToastBridge } from './ToastBridge'
import { wuwalabTheme } from './theme/wuwalabTheme'
import { useInputModality } from './useInputModality'

const TOAST_INSET = { top: 16, end: 16 }

export function AstryxRoot({ children }: { children: ReactNode }) {
  useInputModality()

  return (
    <Theme theme={wuwalabTheme} mode="dark">
      <LinkProvider component={RouterLink}>
        <ToastViewport position="topEnd" inset={TOAST_INSET}>
          <ToastBridge />
          <DialogBridge />
          <TermsProvider>{children}</TermsProvider>
        </ToastViewport>
      </LinkProvider>
    </Theme>
  )
}
