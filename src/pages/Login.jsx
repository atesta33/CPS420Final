import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {login} from '../api/users.js'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [, setToken] = useAuth()

    const loginMutation = useMutation({
        mutationFn: () => login({ username, password }),
        onSuccess: (data) => {
            setToken(data.token)
            navigate('/')
        },
        onError: () => alert('Failed To Login')
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        loginMutation.mutate()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Link to='/'>Back to main page</Link>
            <div>
                <label htmlFor='create-username'>Username: </label>
                <input
                    type='text'
                    name='create-username'
                    id='create-username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='create-password'>Password: </label>
                <input
                    type='password'
                    name='create-password'
                    id='create-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br />
            <input
                type='submit'
                value={loginMutation.isPending ? 'Logging In...' : 'Log In'}
                disabled={!username || !password || loginMutation.isPending}
            />
        </form>
    )
}