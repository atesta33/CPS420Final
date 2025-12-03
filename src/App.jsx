import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Tournaments } from "./pages/Tournaments.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Settings } from "./pages/Settings.jsx";
import { TournamentDetail } from "./pages/TournamentDetail.jsx";
import { MyTournaments } from "./pages/MyTournaments.jsx";
import { MyRegistrations } from "./pages/MyRegistrations.jsx";
import Inbox from "./pages/Inbox.jsx";
import DMChat from "./pages/DMChat.jsx";

import { AuthContentProvider } from "./contexts/AuthContext.jsx";
import { SocketIOProvider } from "./contexts/SocketIOContext.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tournaments />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/my-tournaments",
    element: <MyTournaments />,
  },
  {
    path: "/my-registrations",
    element: <MyRegistrations />,
  },
  {
    path: "/dm/:userId",
    element: <DMChat />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "/tournaments/:id",
    element: <TournamentDetail />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContentProvider>
        <SocketIOProvider>
          <RouterProvider router={router} />
        </SocketIOProvider>
      </AuthContentProvider>
    </QueryClientProvider>
  );
}

export default App;
