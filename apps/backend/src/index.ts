import { WebSocketServer } from 'ws'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
// App
import { controller as NotFoundController } from './controllers/not-found'
import { controller as NoCacheController } from './controllers/no-cache'
import { ExecutionQueue } from './instances/execution-queue'
import { WebsocketRegistry } from './websocket/registry'
import { AppSettings } from './instances/app-settings'
import { Scheduler } from './instances/scheduler'
import { router as ApiRouter } from './routers'
import { seedDatabase } from './database/seed'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api', NoCacheController, ApiRouter)

app.use(NotFoundController)

const httpServer = http.createServer(app)
const websocketServer = new WebSocketServer({
  server: httpServer,
  path: '/ws',
})

websocketServer.on('connection', (socket) => WebsocketRegistry.registerClient(socket))
await ExecutionQueue.cleanRunningExecutions()
await AppSettings.initialize()
seedDatabase()
Scheduler.initialize()

const PORT = AppSettings.settings.BACKEND_SERVER_PORT
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

process.once('SIGTERM', () => Scheduler.stopAll())
process.once('SIGINT', () => Scheduler.stopAll())
