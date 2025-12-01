import { createContext, useContext, useMemo } from "react"
import { io } from "socket.io-client"
import { useAuth } from "./AuthContext"
import { jwtDecode } from "jwt-decode"


const SocketIOContext = createContext(null)

// eslint-disable-next-line react/prop-types
export function SocketIOProvider({ children }) {
  const [token] = useAuth() // your AuthContext returns [token, setToken]

  const socket = useMemo(() => {
    if (!token) return null

    let userId = null
    try {
      const decoded = jwtDecode(token)
      userId = decoded.sub 
    } catch (err) {
      console.error("Invalid token:", err)
      return null
    }

    return io("http://localhost:3001", {
      auth: { tokenUserId: userId },
    })
  }, [token])

  return (
    <SocketIOContext.Provider value={{ socket }}>
      {children}
    </SocketIOContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketIOContext)
}
