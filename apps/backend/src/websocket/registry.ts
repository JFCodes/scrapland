import type { T_API_WEBSOCKET_ServerEvents } from '@scrapland/data-model'
import { WebSocket } from 'ws'
// App
import { WebsocketClient } from './client'

class WebsocketRegistryClass {
  activeClients = new Map<string, WebsocketClient>()

  public registerClient (socket: WebSocket): void {
    const clientId = crypto.randomUUID()

    const client = new WebsocketClient(socket, clientId)
    this.activeClients.set(clientId, client)

    socket.on('close', () => this.activeClients.delete(clientId))
  }

  public broadcast (clientId: string, message: T_API_WEBSOCKET_ServerEvents): void {
    this.activeClients.get(clientId)?.sendMessage(message)
  }

  public broadcastAll (message: T_API_WEBSOCKET_ServerEvents): void {
    const allClients = Array.from(this.activeClients.values())
    allClients.forEach(client => client.sendMessage(message))
  }
}

export const WebsocketRegistry = new WebsocketRegistryClass()