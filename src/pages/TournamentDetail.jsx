import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTournamentById, registerForTournament, withdrawFromTournament, joinAsSpectator, leaveAsSpectator } from "../api/tournaments.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import { User } from "../components/User.jsx";
import { Header } from "../components/Header.jsx";
import styles from "./PostDetail.module.css";

function formatDuration(ms) {
  if (ms == null) return "";
  if (ms <= 0) return "Tournament started";

  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function TournamentDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [token] = useAuth() || {};
  const isLoggedIn = Boolean(token);
  const [timeLeft, setTimeLeft] = useState(null);

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.sub;
    } catch (e) {
      console.error("Error decoding token:", e);
    }
  }

  const {
    data: tournament,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id),
  });

  const registerMutation = useMutation({
    mutationFn: () => registerForTournament(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament", id] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: () => withdrawFromTournament(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament", id] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const spectatorMutation = useMutation({
    mutationFn: () => joinAsSpectator(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament", id] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const unspectateMutation = useMutation({
    mutationFn: () => leaveAsSpectator(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament", id] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleRegister = () => {
    registerMutation.mutate();
  };

  const handleWithdraw = () => {
    if (confirm("Are you sure you want to withdraw from this tournament?")) {
      withdrawMutation.mutate();
    }
  };

  const handleJoinSpectator = () => {
    spectatorMutation.mutate();
  };

  const handleLeaveSpectator = () => {
    unspectateMutation.mutate();
  };

  useEffect(() => {
    if (!tournament?.startTime) {
      setTimeLeft(null);
      return;
    }

    const start = new Date(tournament.startTime).getTime();

    const update = () => {
      const now = Date.now();
      const diff = start - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [tournament?.startTime]);

  if (isLoading) {
    return (
      <div className={styles.detailPage}>
        <Header />
        <div className={styles.loading}>Loading tournament details...</div>
      </div>
    );
  }

  if (isError || !tournament) {
    return (
      <div className={styles.detailPage}>
        <Header />
        <div className={styles.container}>
          <div className={styles.error}>
            <div>
              <p>Error loading tournament.</p>
              <p>{error?.message}</p>
              <Link to="/">Back to tournaments</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    rules,
    organizer,
    format,
    timeControl,
    location,
    venue,
    maxParticipants,
    numberOfRounds,
    participants = [],
    spectators = [],
    status,
    startTime,
    registrationDeadline,
  } = tournament;

  const isRegistrationOpen = status === "REGISTRATION_OPEN";
  const activeParticipants = participants.filter((p) => p.status === "REGISTERED");
  const isUserRegistered =
    userId && activeParticipants.some((p) => p.player === userId || p.player?._id === userId);
  const isUserSpectator =
    userId && spectators.some((s) => s.user === userId || s.user?._id === userId);

  return (
    <div className={styles.detailPage}>
      <Header />
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to Tournaments
        </Link>

        <div className={styles.content}>
          <div className={styles.mainSection}>
            <div className={styles.imageSection}>
              <div className={styles.placeholderImage}>♟️</div>
            </div>

            <div className={styles.infoCard}>
              <div
                className={`${styles.statusBadge} ${
                  isRegistrationOpen ? styles.open : styles.closed
                }`}
              >
                {status.replace(/_/g, " ")}
              </div>

              <h1 className={styles.title}>{name}</h1>

              <p className={styles.description}>{description || "No description provided."}</p>

              {rules && (
                <div>
                  <h3>Rules & Regulations</h3>
                  <p className={styles.description}>{rules}</p>
                </div>
              )}

              {organizer && (
                <div className={styles.sellerSection}>
                  <span className={styles.sellerLabel}>Organizer:</span>
                  <User id={organizer} />
                  <Link to={`/dm/${organizer}`} className={styles.messageSellerBtn}>
                    Contact Organizer
                  </Link>
                </div>
              )}
            </div>

            <div className={styles.bidHistory}>
              <h2 className={styles.bidHistoryTitle}>
                Participants ({activeParticipants.length}/{maxParticipants})
              </h2>

              {activeParticipants.length === 0 ? (
                <div className={styles.noBids}>No participants yet. Be the first!</div>
              ) : (
                <div className={styles.bidList}>
                  {activeParticipants.map((participant, index) => (
                    <div key={index} className={styles.bidItem}>
                      <div className={styles.bidItemLeft}>
                        <div className={styles.bidder}>
                          <User id={participant.player} />
                        </div>
                        {participant.registeredAt && (
                          <div className={styles.bidTime}>
                            Registered: {new Date(participant.registeredAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.bidHistory}>
              <h2 className={styles.bidHistoryTitle}>
                Spectators ({spectators.length})
              </h2>

              {spectators.length === 0 ? (
                <div className={styles.noBids}>No spectators yet.</div>
              ) : (
                <div className={styles.bidList}>
                  {spectators.map((spectator, index) => (
                    <div key={index} className={styles.bidItem}>
                      <div className={styles.bidItemLeft}>
                        <div className={styles.bidder}>
                          <User id={spectator.user} />
                        </div>
                        {spectator.joinedAt && (
                          <div className={styles.bidTime}>
                            Joined: {new Date(spectator.joinedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.bidCard}>
              <div className={styles.priceSection}>
                <div className={styles.currentPriceLabel}>Tournament Info</div>
              </div>

              <div className={styles.auctionMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Format</span>
                  <span className={styles.metaValue}>{format?.replace(/_/g, " ")}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Time Control</span>
                  <span className={styles.metaValue}>{timeControl}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Rounds</span>
                  <span className={styles.metaValue}>{numberOfRounds}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Participants</span>
                  <span className={styles.metaValue}>
                    {activeParticipants.length}/{maxParticipants}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Starts In</span>
                  <span className={`${styles.metaValue} ${styles.countdown}`}>
                    {formatDuration(timeLeft) || "Started"}
                  </span>
                </div>
                {location && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Location</span>
                    <span className={styles.metaValue}>{location}</span>
                  </div>
                )}
                {venue && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Venue</span>
                    <span className={styles.metaValue}>{venue}</span>
                  </div>
                )}
                {startTime && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Start Date</span>
                    <span className={styles.metaValue}>
                      {new Date(startTime).toLocaleString()}
                    </span>
                  </div>
                )}
                {registrationDeadline && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Registration Deadline</span>
                    <span className={styles.metaValue}>
                      {new Date(registrationDeadline).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {!isLoggedIn && (
                <div className={styles.loginPrompt}>
                  <p>Please log in to register for this tournament</p>
                </div>
              )}

              {isLoggedIn && !isRegistrationOpen && (
                <div className={styles.closedMessage}>
                  <p>Registration is closed</p>
                </div>
              )}

              {isLoggedIn && isRegistrationOpen && !isUserRegistered && (
                <button
                  onClick={handleRegister}
                  disabled={
                    registerMutation.isPending || activeParticipants.length >= maxParticipants
                  }
                  className={styles.bidButton}
                >
                  {registerMutation.isPending
                    ? "Registering..."
                    : activeParticipants.length >= maxParticipants
                      ? "Tournament Full"
                      : "Register for Tournament"}
                </button>
              )}

              {isLoggedIn && isUserRegistered && (
                <div>
                  <div className={styles.successMessage}>You are registered!</div>
                  {isRegistrationOpen && (
                    <button
                      onClick={handleWithdraw}
                      disabled={withdrawMutation.isPending}
                      className={styles.bidButton}
                      style={{ marginTop: "10px", backgroundColor: "#EF4444" }}
                    >
                      {withdrawMutation.isPending ? "Withdrawing..." : "Withdraw"}
                    </button>
                  )}
                </div>
              )}

              {isLoggedIn && !isUserRegistered && !isUserSpectator && (
                <button
                  onClick={handleJoinSpectator}
                  disabled={spectatorMutation.isPending}
                  className={styles.bidButton}
                  style={{ marginTop: "10px", backgroundColor: "#6B7280" }}
                >
                  {spectatorMutation.isPending ? "Joining..." : "Join as Spectator"}
                </button>
              )}

              {isLoggedIn && isUserSpectator && (
                <div>
                  <div className={styles.successMessage}>You are a spectator</div>
                  <button
                    onClick={handleLeaveSpectator}
                    disabled={unspectateMutation.isPending}
                    className={styles.bidButton}
                    style={{ marginTop: "10px", backgroundColor: "#EF4444" }}
                  >
                    {unspectateMutation.isPending ? "Leaving..." : "Leave Spectators"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
