import type { ComponentProps } from 'react'
import { Selector } from '@astryxdesign/core/Selector'

export function Select(props: ComponentProps<typeof Selector>) {
  return <Selector placement="below" {...props} />
}
