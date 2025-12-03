import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../contexts/AuthContext"
import { User } from "./User.jsx"
import styles from './Header.module.css'

export function Header() {
    const [token, setToken] = useAuth()

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link to="/" className={styles.brand}>
                    <span className={styles.brandIcon}>♟️</span>
                    <span>Chess Tournament Manager</span>
                </Link>
                <nav className={styles.nav}>

                    {token ? (
                        <div className={styles.userInfo}>
                            <div className={styles.userDetails}>
                                <span className={styles.loggedInText}>
                                    <User id={jwtDecode(token).sub} />
                                </span>
                            </div>

                            <div className={styles.authLinks}>
                                <Link to="/my-tournaments" className={styles.navLink}>My Tournaments</Link>
                                <Link to="/my-registrations" className={styles.navLink}>My Registrations</Link>
                                <Link to="/inbox" className={styles.navLink}>Inbox</Link>
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
