import { useSocket } from "../contexts/SocketIOContext.jsx"
import { useEffect, useState } from "react"

export function useDMChat(withUserId) {
  const { socket } = useSocket()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!socket || !withUserId) return

    socket.emit("dm.join", { withUserId })

    socket.emit("dm.history", { withUserId }, (history) => {
      setMessages(history)
    })

    const handler = (msg) => {
      if (msg.from === withUserId || msg.to === withUserId) {
        setMessages((prev) => [...prev, msg])
      }
    }

    socket.on("dm.message", handler)
    return () => socket.off("dm.message", handler)
  }, [socket, withUserId])

  function send(text) {
    if (!text.trim()) return
    socket.emit("dm.send", { toUserId: withUserId, text })
  }

  return { messages, send }
}
