import type { ComponentProps } from 'react'
import { TabList as AstryxTabList } from '@astryxdesign/core/TabList'

export function TabList(props: ComponentProps<typeof AstryxTabList>) {
  return <AstryxTabList hasDivider {...props} />
}
