import type { ReactNode } from 'react'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'

type Props = { kicker: string; title: string; children?: ReactNode }

export function PageHeader({ kicker, title, children }: Props) {
  return (
    <VStack gap={2}>
      <span className="wl-kicker">{kicker}</span>
      <Heading level={1}>{title}</Heading>
      {children !== undefined && <Text color="secondary">{children}</Text>}
    </VStack>
  )
}
