import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {signup} from '../api/users.js'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'

export function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('PLAYER')
    const navigate = useNavigate()

    const signupMutation = useMutation({
        mutationFn: () => signup({ username, password, role }),
        onSuccess: () => navigate('/login'),
        onError: () => alert('Failed To Sign Up')
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        signupMutation.mutate()
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <Link to='/' className={styles.backLink}>
                    ← Back to main page
                </Link>

                <h1 className={styles.heading}>Create Account</h1>
                <p className={styles.subheading}>Join the Chess Tournament Community</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor='create-username' className={styles.label}>
                            Username
                        </label>
                        <input
                            type='text'
                            name='create-username'
                            id='create-username'
                            placeholder='Choose a username'
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
                            placeholder='Create a secure password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='create-role' className={styles.label}>
                            Account Type
                        </label>
                        <select
                            id='create-role'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={styles.input}
                        >
                            <option value='PLAYER'>Player - Participate in tournaments</option>
                            <option value='ORGANIZER'>Organizer - Create and manage tournaments</option>
                            <option value='SPECTATOR'>Spectator - Watch and follow tournaments</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        disabled={!username || !password || signupMutation.isPending}
                        className={styles.submitButton}
                    >
                        {signupMutation.isPending ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className={styles.switchLink}>
                    Already have an account?
                    <Link to='/login'>Log in</Link>
                </div>
            </div>
        </div>
    )
}