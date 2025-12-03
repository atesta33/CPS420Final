import PropTypes from "prop-types";
import { Tournament } from "./Tournament.jsx";
import styles from "./PostList.module.css";

export function TournamentList({ tournaments = [] }) {
  if (tournaments.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No tournaments yet</h3>
        <p>Be the first to create a tournament!</p>
      </div>
    );
  }

  return (
    <div className={styles.postGrid}>
      {tournaments.map((tournament) => (
        <Tournament
          key={tournament._id}
          id={tournament._id}
          name={tournament.name}
          description={tournament.description}
          organizer={
            typeof tournament.organizer === "string"
              ? tournament.organizer
              : tournament.organizer?._id
          }
          format={tournament.format}
          timeControl={tournament.timeControl}
          location={tournament.location}
          maxParticipants={tournament.maxParticipants}
          participants={tournament.participants}
          status={tournament.status}
          startTime={tournament.startTime}
          registrationDeadline={tournament.registrationDeadline}
        />
      ))}
    </div>
  );
}

TournamentList.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      organizer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          _id: PropTypes.string,
        }),
      ]),
      format: PropTypes.string,
      timeControl: PropTypes.string,
      location: PropTypes.string,
      maxParticipants: PropTypes.number,
      participants: PropTypes.array,
      status: PropTypes.string,
      startTime: PropTypes.string,
      registrationDeadline: PropTypes.string,
    }),
  ).isRequired,
};
