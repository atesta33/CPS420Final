import { Link } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'
import { useAuth } from "../contexts/AuthContext"
import { User } from "./User.jsx"
import styles from './Header.module.css'

export function Header() {
    const [token, setToken] = useAuth()

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link to="/" className={styles.brand}>
                    Blog
                </Link>
                <nav className={styles.nav}>
                    {token ? (
                        <div className={styles.userInfo}>
                            <span className={styles.loggedInText}>
                                Logged in as <User id={jwtDecode(token).sub} />
                            </span>
                            <div className={styles.authLinks}>
                                <Link to="/settings" className={styles.navLink}>Settings</Link>
                                <button
                                    onClick={() => setToken(null)}
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.authLinks}>
                            <Link to="/login" className={styles.navLink}>Login</Link>
                            <Link to="/signup" className={styles.navLink}>Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}