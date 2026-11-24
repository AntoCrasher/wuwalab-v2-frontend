import type { ReactNode } from 'react'
import { VStack } from '@astryxdesign/core/VStack'

export function AdminPage({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <VStack gap={5} paddingBlock={6}>
        {children}
      </VStack>
    </div>
  )
}
