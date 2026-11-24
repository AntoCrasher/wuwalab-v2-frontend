import { useEffect, useState } from 'react'
import { Button } from '@astryxdesign/core/Button'
import { Dialog } from '@astryxdesign/core/Dialog'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { currentAsk, onAskChange, type Ask } from './confirm'

const WIDTH = 440

function AskDialog({ ask }: { ask: Ask }) {
  const { options, settle } = ask

  return (
    <Dialog
      isOpen
      onOpenChange={(open) => {
        if (!open) {
          settle(false)
        }
      }}
      width={WIDTH}
      padding={5}
    >
      <VStack gap={3}>
        <Heading level={3}>{options.title}</Heading>
        {options.message !== undefined && <Text type="supporting">{options.message}</Text>}
        <HStack gap={2} justify="end">
          <Button variant="ghost" size="sm" label="Cancel" onClick={() => settle(false)} />
          <Button
            variant={options.danger === true ? 'destructive' : 'primary'}
            size="sm"
            label={options.confirmLabel ?? 'Confirm'}
            onClick={() => settle(true)}
          />
        </HStack>
      </VStack>
    </Dialog>
  )
}

export function DialogBridge() {
  const [, setTick] = useState(0)

  useEffect(() => {
    onAskChange(() => setTick((tick) => tick + 1))
    return () => onAskChange(null)
  }, [])

  const ask = currentAsk()
  return ask === undefined ? null : <AskDialog key={ask.id} ask={ask} />
}
