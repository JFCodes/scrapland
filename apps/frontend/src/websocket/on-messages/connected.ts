// App
import { websocket } from '@/websocket/client'
import { useToastsStore } from '@/stores/toasts'
import { API } from '@/api'

export function onMessage (clientId: string): void {
  websocket.send({ type: 'ping' })
  
  API.setWsClientId(clientId)

  useToastsStore().launch({
    title: 'Websocket connected',
    type: 'success',
    messages: []
  })
}