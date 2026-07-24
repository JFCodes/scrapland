import type { T_API_WEBSOCKET_ServerEvents, T_API_WEBSOCKET_ClientEvents } from '@scrapland/data-model'
import { WebSocket } from 'ws'

export class WebsocketClient {
  clientId: string
  socket: WebSocket

  constructor (socket: WebSocket, clientId: string) {
    this.clientId = clientId
    this.socket = socket
    this.registerEvents()
    this.sendConnectedMessage()
  }

  public sendMessage (message: T_API_WEBSOCKET_ServerEvents): void {
    if (this.socket.readyState !== WebSocket.OPEN) return
    this.socket.send(JSON.stringify(message))
  }

  private registerEvents (): void {
    this.socket.on('message', rawData => {
      const parsed = this.parseClientMessage(rawData)
      if (!parsed) return

      switch (parsed.type) {
        case 'ping':
          this.sendMessage({ type: 'pong' })
      }
    })
  }

  private sendConnectedMessage (): void {
    this.sendMessage({
      payload: { clientId: this.clientId },
      type: 'connected',
    })
  }

  private parseClientMessage(data: WebSocket.RawData): T_API_WEBSOCKET_ClientEvents | null {
    try {
      return JSON.parse(data.toString()) as T_API_WEBSOCKET_ClientEvents
    } catch {
      return null
    }
  }
}
