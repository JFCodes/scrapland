import { websocket } from './client'
// Message handlers
import { onMessage as OnExecutionCompleted } from '@/websocket/on-messages/execution-completed'
import { onMessage as OnExecutionAborted } from '@/websocket/on-messages/execution-aborted'
import { onMessage as OnExecutionRunning } from '@/websocket/on-messages/execution-running'
import { onMessage as OnExecutionFailed } from '@/websocket/on-messages/execution-failed'
import { onMessage as OnExecutionQueued } from '@/websocket/on-messages/execution-queued'
import { onMessage as OnConnected} from '@/websocket/on-messages/connected'
import { onMessage as OnPong } from '@/websocket/on-messages/on-pong'

export const unsubscribeSocket = websocket.onMessage(message => {
  console.log({ message })

  switch (message.type) {
    case 'execution-completed': return OnExecutionCompleted(message.payload)
    case 'execution-aborted': return OnExecutionAborted(message.payload)
    case 'execution-running': return OnExecutionRunning(message.payload)
    case 'execution-failed': return OnExecutionFailed(message.payload)
    case 'execution-queued': return OnExecutionQueued(message.payload)
    case 'connected': return OnConnected(message.payload.clientId)
    case 'pong': return OnPong()
  }
})
