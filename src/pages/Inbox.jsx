import { useQuery } from "@tanstack/react-query"
import { getConversations } from "../api/conversations"
import { useAuth } from "../contexts/AuthContext"
import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom"
import { User } from "../components/User.jsx" 
import styles from "./Inbox.module.css"

export default function Inbox() {
  const [token] = useAuth()

  if (!token) {
    return <p className={styles.notice}>Please log in to view your inbox.</p>
  }

  // decode username
  let userId
  try {
    const decoded = jwtDecode(token)
    userId = decoded.sub
  } catch (err) {
    console.error("Invalid token:", err)
    return <p className={styles.notice}>Invalid login. Please log in again.</p>
  }

  // get convos
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getConversations(userId),
  })

  if (isLoading) {
    return <p className={styles.notice}>Loading inbox...</p>
  }

  return (
    <div className={styles.inboxPage}>
      
      {/* back button */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.backBtn}>← Back to Home</Link>
        <h2 className={styles.title}>Your Inbox</h2>
      </div>

      {conversations.length === 0 && (
        <p className={styles.noConvo}>No conversations yet.</p>
      )}

      <div className={styles.list}>
        {conversations.map((c) => {
          // fin dother user
          const otherUser = c.lastFrom === userId ? c.lastTo : c.lastFrom

          return (
            <Link
              key={c._id}
              to={`/dm/${otherUser}`}
              className={styles.convoItem}
            >
              <div className={styles.meta}>

                {/* USERNAME INSTEAD OF ID */}
                <strong>
                  Conversation with <User id={otherUser} />
                </strong>

                <p className={styles.preview}>{c.lastMessage}</p>
              </div>

              <span className={styles.time}>
                {new Date(c.timestamp).toLocaleString()}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
