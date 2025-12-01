import { Message } from './db/models/messages.js'
import { getDMRoom } from './services/dm.js'
// import { getUserInfoById } from './services/users.js' 

export function handleSocket(io) {
  io.on('connection', async (socket) => {

    // The frontend must send { auth: { tokenUserId: user._id } }
    const userId = socket.handshake.auth?.tokenUserId
    if (!userId) {
      console.log("Socket rejected: No user ID provided.")
      return socket.disconnect()
    }

    console.log(`User connected: ${userId}`)

    // =============== JOIN DM ROOM ===============
    socket.on('dm.join', ({ withUserId }) => {
      if (!withUserId) return
      const room = getDMRoom(userId, withUserId)
      socket.join(room)
      console.log(`User ${userId} joined room ${room}`)
    })

    // =============== SEND MESSAGE ===============
    socket.on('dm.send', async ({ toUserId, text }) => {
      if (!text?.trim()) return

      const room = getDMRoom(userId, toUserId)

      const msg = await Message.create({
        from: userId,
        to: toUserId,
        text,
        room
      })

      io.to(room).emit('dm.message', msg)
    })

    // =============== LOAD MESSAGE HISTORY ===============
    socket.on('dm.history', async ({ withUserId }, callback) => {
      const room = getDMRoom(userId, withUserId)
      const messages = await Message.find({ room }).sort({ createdAt: 1 })
      callback(messages)
    })

    // =============== OPTIONAL DISCONNECT LOGGING ===============
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${userId}`)
    })
  })
}
