import { WebSocketServer } from 'ws'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
// App
import { controller as NotFoundController } from './controllers/not-found'
import { controller as NoCacheController } from './controllers/no-cache'
import { ExecutionQueue } from './instances/execution-queue'
import { router as ApiRouter } from './routers'
import { seedDatabase } from './database/seed'

import { WebsocketRegistry } from './websocket/registry'
// import { scheduler } from './schedule/scheduler'

const PORT = 3000

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
// scheduler.initialize()
seedDatabase()

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
