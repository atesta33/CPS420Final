import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getTournaments } from "../api/tournaments.js";
import { getUserInfo } from "../api/users.js";
import { TournamentList } from "../components/TournamentList";
import { Header } from "../components/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import styles from "./MyListings.module.css";

export function MyTournaments() {
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

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });

  const username = userQuery.data?.username;

  const tournamentsQuery = useQuery({
    queryKey: ["tournaments", { organizer: username }],
    queryFn: () => getTournaments({ organizer: username }),
    enabled: !!username,
  });

  const tournaments = tournamentsQuery.data ?? [];

  if (!token) {
    return (
      <div className={styles.myListingsPage}>
        <Header />
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <h2>Please Log In</h2>
            <p>You need to be logged in to view your tournaments.</p>
            <Link to="/login" className={styles.loginLink}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.myListingsPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Tournaments</h1>
          <p className={styles.pageSubtitle}>
            Manage your organized chess tournaments
          </p>
        </div>

        {tournamentsQuery.isLoading && (
          <div className={styles.loading}>Loading your tournaments...</div>
        )}

        {tournamentsQuery.isError && (
          <div className={styles.error}>
            Error loading tournaments. Please try again.
          </div>
        )}

        {!tournamentsQuery.isLoading && !tournamentsQuery.isError && (
          <>
            {tournaments.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No tournaments yet</h3>
                <p>Create your first tournament to start organizing!</p>
                <Link to="/" className={styles.createButton}>
                  Create Tournament
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
