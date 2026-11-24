import type { ReactNode } from 'react'
import { LinkProvider } from '@astryxdesign/core/Link'
import { Theme } from '@astryxdesign/core/theme'
import '@astryxdesign/core/astryx.css'
import './astryx.css'
import './ledger.css'
import { RouterLink } from './RouterLink'
import { wuwalabTheme } from './theme/wuwalabTheme'

export function AstryxRoot({ children }: { children: ReactNode }) {
  return (
    <Theme theme={wuwalabTheme} mode="dark">
      <LinkProvider component={RouterLink}>{children}</LinkProvider>
    </Theme>
  )
}
