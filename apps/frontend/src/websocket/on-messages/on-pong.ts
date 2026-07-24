// App
import { useToastsStore } from '@/stores/toasts'

export function onMessage (): void {
  useToastsStore().launch({
    title: 'Websocket hand shake completed',
    type: 'success',
    messages: []
  })
}