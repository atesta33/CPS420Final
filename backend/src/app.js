import express from 'express'
import bodyParser from 'body-parser'
import { userRoutes } from './routes/users.js'
import { postsRoutes } from './routes/posts.js'
import { tournamentsRoutes } from './routes/tournaments.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'
import { conversationsRoutes } from "./routes/conversations.js"

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

userRoutes(app)
postsRoutes(app)
tournamentsRoutes(app)
app.use("/api/conversations", conversationsRoutes)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)

export default server
