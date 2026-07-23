// import { WebSocketServer } from 'ws'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
// App
import { controller as NoCacheController } from './controllers/no-cache'
import { ExecutionQueue } from './instances/execution-queue'
import { router as ApiRouter } from './routers'
import { seedDatabase } from './database/seed'

// import { initializeWebSocket } from './websocket'
// import { scheduler } from './schedule/scheduler'
// import './queues'

const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api', NoCacheController, ApiRouter)

const httpServer = http.createServer(app)
// const websocketServer = new WebSocketServer({
//   server: httpServer,
//   path: '/ws',
// })

await ExecutionQueue.cleanRunningExecutions()
// initializeWebSocket(websocketServer)
// scheduler.initialize()
seedDatabase()

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
