import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { AuthContentProvider } from "./contexts/AuthContext.jsx"
import { SocketIOProvider } from "./contexts/SocketIOContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContentProvider>
      <SocketIOProvider>
        <App />
      </SocketIOProvider>
    </AuthContentProvider>
  </React.StrictMode>
)
