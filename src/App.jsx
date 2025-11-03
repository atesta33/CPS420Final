import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Blog} from './pages/Blog.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup.jsx'
import { AuthContentProvider } from './contexts/AuthContext.jsx'
import { Login } from './pages/Login.jsx'
import { Settings } from './pages/Settings.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element : <Blog />,
    },
    {
        path: "/signup",
        element : <Signup />,
    },
    {
        path: "/login",
        element : <Login />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
])

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContentProvider>
            <RouterProvider router={router} />
            </AuthContentProvider>
        </QueryClientProvider>
    )
}