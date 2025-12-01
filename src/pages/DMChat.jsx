import { useParams } from "react-router-dom"
import { useState } from "react"
import { useDMChat } from "../hooks/useDMChat"

export default function DMChat() {
  const { userId } = useParams()
  const { messages, send } = useDMChat(userId)
  const [text, setText] = useState("")

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Chat</h2>

      <div style={{ height: "60vh", overflowY: "auto", border: "1px solid #ddd", padding: "1rem" }}>
        {messages.map((m) => (
          <div key={m._id} style={{ marginBottom: "8px" }}>
            <strong>{m.from === userId ? "Them" : "You"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
        <input
          style={{ flex: 1 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => { send(text); setText("") }}>
          Send
        </button>
      </div>
    </div>
  )
}
