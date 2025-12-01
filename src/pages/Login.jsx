import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {login} from '../api/users.js'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import styles from './Auth.module.css'

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
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <Link to='/' className={styles.backLink}>
                    ← Back to main page
                </Link>

                <h1 className={styles.heading}>Welcome Back</h1>
                <p className={styles.subheading}>Log in to your account to continue</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor='create-username' className={styles.label}>
                            Username
                        </label>
                        <input
                            type='text'
                            name='create-username'
                            id='create-username'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='create-password' className={styles.label}>
                            Password
                        </label>
                        <input
                            type='password'
                            name='create-password'
                            id='create-password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={!username || !password || loginMutation.isPending}
                        className={styles.submitButton}
                    >
                        {loginMutation.isPending ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                <div className={styles.switchLink}>
                    Don&apos;t have an account?
                    <Link to='/signup'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}