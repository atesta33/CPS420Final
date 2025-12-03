import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { User } from "./User.jsx";

function CountdownTimer({ startTime, registrationDeadline }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const now = Date.now();
    const regDeadline = registrationDeadline ? new Date(registrationDeadline).getTime() : null;
    const tournamentStart = startTime ? new Date(startTime).getTime() : null;

    let targetTime = null;
    let targetLabel = "";

    if (regDeadline && now < regDeadline) {
      targetTime = regDeadline;
      targetLabel = "Registration closes in: ";
    } else if (tournamentStart && now < tournamentStart) {
      targetTime = tournamentStart;
      targetLabel = "Starts in: ";
    }

    if (!targetTime) {
      setTimeLeft(null);
      setLabel("");
      return;
    }

    const update = () => {
      const currentNow = Date.now();
      const diff = targetTime - currentNow;
      setTimeLeft(diff > 0 ? diff : 0);
      setLabel(targetLabel);
    };

    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, registrationDeadline]);

  if (timeLeft === null) {
    return <span className={styles.noEndTime}>Ongoing</span>;
  }

  if (timeLeft === 0) {
    return <span className={styles.ended}>Started</span>;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let timeDisplay = "";
  if (days > 0) {
    timeDisplay = `${days}d ${hours}h`;
  } else if (hours > 0) {
    timeDisplay = `${hours}h ${minutes}m`;
  } else {
    timeDisplay = `${minutes}m ${seconds}s`;
  }

  return <span>{label}{timeDisplay}</span>;
}

export function Tournament({
  id,
  name,
  description,
  organizer,
  format,
  timeControl,
  location,
  maxParticipants,
  participants,
  status,
  startTime,
  registrationDeadline,
}) {
  const participantCount = participants?.filter(p => p.status === "REGISTERED").length || 0;
  const isRegistrationOpen = status === "REGISTRATION_OPEN";

  return (
    <article className={`${styles.productCard} ${!isRegistrationOpen && status !== "UPCOMING" ? styles.closed : ''}`}>
      <div className={styles.imageContainer}>
        <div className={styles.placeholderImage}>
          <span className={styles.imageIcon}>♟️</span>
        </div>
        {status === "COMPLETED" && <div className={styles.closedOverlay}>COMPLETED</div>}
        {status === "CANCELLED" && <div className={styles.closedOverlay}>CANCELLED</div>}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.statusBadge} data-status={status}>
          {status.replace(/_/g, " ")}
        </div>

        <h3 className={styles.productTitle}>{name}</h3>
        <p className={styles.productDescription}>
          {description && description.length > 120
            ? `${description.substring(0, 120)}...`
            : description}
        </p>

        <div className={styles.auctionInfo}>
          <div className={styles.priceSection}>
            <div className={styles.currentPrice}>
              <span className={styles.priceLabel}>Format</span>
              <span className={styles.priceAmount}>
                {format?.replace(/_/g, " ")} - {timeControl}
              </span>
            </div>
            {location && (
              <div className={styles.startingPrice}>
                Location: {location}
              </div>
            )}
          </div>

          <div className={styles.auctionMeta}>
            <div className={styles.bidCount}>
              <span className={styles.metaIcon}>👥</span>
              <span>{participantCount}/{maxParticipants} players</span>
            </div>
            <div className={styles.timeLeft}>
              <span className={styles.metaIcon}>⏰</span>
              <CountdownTimer startTime={startTime} registrationDeadline={registrationDeadline} />
            </div>
          </div>
        </div>

        {organizer && (
          <div className={styles.sellerInfo}>
            <span className={styles.sellerLabel}>Organizer:</span>
            <User id={organizer} />
          </div>
        )}

        <div className={styles.actions}>
          <Link to={`/tournaments/${id}`} className={styles.bidButton}>
            {isRegistrationOpen ? 'Register' : 'View Details'}
          </Link>
          {organizer && (
            <Link to={`/dm/${organizer}`} className={styles.messageButton}>
              Contact
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

Tournament.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  organizer: PropTypes.string,
  format: PropTypes.string,
  timeControl: PropTypes.string,
  location: PropTypes.string,
  maxParticipants: PropTypes.number,
  participants: PropTypes.array,
  status: PropTypes.string,
  startTime: PropTypes.string,
  registrationDeadline: PropTypes.string,
};

CountdownTimer.propTypes = {
  startTime: PropTypes.string,
  registrationDeadline: PropTypes.string,
};
