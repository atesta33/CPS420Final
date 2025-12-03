import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getTournaments } from "../api/tournaments.js";
import { TournamentList } from "../components/TournamentList";
import { Header } from "../components/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import styles from "./MyBids.module.css";

export function MyRegistrations() {
  const [token] = useAuth();

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.sub;
    } catch (e) {
      console.error("Error decoding token:", e);
    }
  }

  const tournamentsQuery = useQuery({
    queryKey: ["tournaments", { participant: userId }],
    queryFn: () => getTournaments({ participant: userId }),
    enabled: !!userId,
  });

  const tournaments = tournamentsQuery.data ?? [];

  if (!token) {
    return (
      <div className={styles.myBidsPage}>
        <Header />
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <h2>Please Log In</h2>
            <p>You need to be logged in to view your registrations.</p>
            <Link to="/login" className={styles.loginLink}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.myBidsPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Registrations</h1>
          <p className={styles.pageSubtitle}>
            Track your tournament registrations and participation
          </p>
        </div>

        {tournamentsQuery.isLoading && (
          <div className={styles.loading}>Loading your registrations...</div>
        )}

        {tournamentsQuery.isError && (
          <div className={styles.error}>
            Error loading registrations. Please try again.
          </div>
        )}

        {!tournamentsQuery.isLoading && !tournamentsQuery.isError && (
          <>
            {tournaments.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>♟️</span>
                </div>
                <h3>No registrations yet</h3>
                <p>Register for tournaments to see them here!</p>
                <Link to="/" className={styles.browseButton}>
                  Browse Tournaments
                </Link>
              </div>
            ) : (
              <TournamentList tournaments={tournaments} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
