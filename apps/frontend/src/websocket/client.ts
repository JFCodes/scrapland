import type { T_API_WEBSOCKET_ClientEvents, T_API_WEBSOCKET_ServerEvents } from '@scrapland/data-model'

type MessageListener = (message: T_API_WEBSOCKET_ServerEvents) => void
type ConnectionListener = (connected: boolean) => void

const websocketUrl = 'http://localhost:3000/ws'

class WebSocketClient {
  public socket: WebSocket | null = null
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  private manuallyClosed = false
  private reconnectAttempts = 0

  private readonly connectionListeners = new Set<ConnectionListener>()
  private readonly messageListeners = new Set<MessageListener>()

  public constructor(private readonly url: string) {}

  public get connected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }

  public connect(): void {
    const readyState = this.socket?.readyState
    if (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN) return

    const socket = new WebSocket(this.url)
    this.manuallyClosed = false
    this.socket = socket

    socket.addEventListener('open', () => {
      this.reconnectAttempts = 0
      this.notifyConnectionListeners(true)
    })

    socket.addEventListener('message', event => {
      const message = this.parseServerMessage(event.data)
      if (!message) {
        console.error('Received an invalid WebSocket message:', event.data)
        return
      }

      for (const listener of this.messageListeners) {
        listener(message)
      }
    })

    socket.addEventListener('close', event => {
      this.socket = null
      this.notifyConnectionListeners(false)

      if (!this.manuallyClosed) this.scheduleReconnect()
    })

    socket.addEventListener('error', event => {
      console.error('WebSocket error:', event)
    })
  }

  public disconnect(): void {
    this.manuallyClosed = true

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.socket?.close(1000, 'Client disconnected')
    this.socket = null
  }

  public send(message: T_API_WEBSOCKET_ClientEvents): boolean {
    if (this.socket?.readyState !== WebSocket.OPEN) return false

    this.socket.send(JSON.stringify(message))
    return true
  }

  public onMessage(listener: MessageListener): () => void {
    this.messageListeners.add(listener)
    return () => {
      this.messageListeners.delete(listener)
    }
  }

  public onConnectionChange(listener: ConnectionListener): () => void {
    this.connectionListeners.add(listener)

    return () => {
      this.connectionListeners.delete(listener)
    }
  }

  private parseServerMessage(data: unknown): T_API_WEBSOCKET_ServerEvents | null {
    if (typeof data !== 'string') return null

    try {
      const parsed: unknown = JSON.parse(data)

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('type' in parsed) ||
        typeof parsed.type !== 'string'
      ) {
        return null
      }

      return parsed as T_API_WEBSOCKET_ServerEvents
    } catch {
      return null
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimeout) {
      return
    }

    const delay = Math.min(
      1_000 * 2 ** this.reconnectAttempts,
      30_000,
    )

    this.reconnectAttempts += 1

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null
      this.connect()
    }, delay)
  }

  private notifyConnectionListeners(connected: boolean): void {
    for (const listener of this.connectionListeners) {
      listener(connected)
    }
  }
}

export const websocket = new WebSocketClient(websocketUrl)
