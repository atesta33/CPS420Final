import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTournament } from "../api/tournaments.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./CreatePost.module.css";

export function CreateTournament() {
  const [token] = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [format, setFormat] = useState("SWISS");
  const [timeControl, setTimeControl] = useState("BLITZ");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("32");
  const [numberOfRounds, setNumberOfRounds] = useState("5");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const queryClient = useQueryClient();

  const createTournamentMutation = useMutation({
    mutationFn: () =>
      createTournament(token, {
        name,
        description,
        rules,
        format,
        timeControl,
        location,
        venue,
        maxParticipants,
        numberOfRounds,
        registrationDeadline,
        startTime,
        endTime,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      setName("");
      setDescription("");
      setRules("");
      setFormat("SWISS");
      setTimeControl("BLITZ");
      setLocation("");
      setVenue("");
      setMaxParticipants("32");
      setNumberOfRounds("5");
      setRegistrationDeadline("");
      setStartTime("");
      setEndTime("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTournamentMutation.mutate({});
  };

  if (!token) {
    return (
      <div className={styles.loginPrompt}>
        Please log in to create a tournament.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.createForm}>
      <div className={styles.formGroup}>
        <label htmlFor="create-name" className={styles.label}>
          Tournament Name
        </label>
        <input
          type="text"
          name="create-name"
          id="create-name"
          placeholder="e.g., Spring Championship 2024"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.titleInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="create-description" className={styles.label}>
          Tournament Description
        </label>
        <textarea
          id="create-description"
          placeholder="Describe your tournament..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.contentTextarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="create-rules" className={styles.label}>
          Rules & Regulations
        </label>
        <textarea
          id="create-rules"
          placeholder="Tournament rules and requirements..."
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          className={styles.contentTextarea}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="create-format" className={styles.label}>
            Tournament Format
          </label>
          <select
            id="create-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className={styles.titleInput}
          >
            <option value="SWISS">Swiss</option>
            <option value="ROUND_ROBIN">Round Robin</option>
            <option value="KNOCKOUT">Knockout</option>
            <option value="DOUBLE_ELIMINATION">Double Elimination</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="create-timeControl" className={styles.label}>
            Time Control
          </label>
          <select
            id="create-timeControl"
            value={timeControl}
            onChange={(e) => setTimeControl(e.target.value)}
            className={styles.titleInput}
          >
            <option value="BULLET">Bullet</option>
            <option value="BLITZ">Blitz</option>
            <option value="RAPID">Rapid</option>
            <option value="CLASSICAL">Classical</option>
            <option value="CORRESPONDENCE">Correspondence</option>
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="create-location" className={styles.label}>
            Location
          </label>
          <input
            type="text"
            id="create-location"
            placeholder="City, State"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.titleInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="create-venue" className={styles.label}>
            Venue
          </label>
          <input
            type="text"
            id="create-venue"
            placeholder="Venue name or address"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className={styles.titleInput}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="create-maxParticipants" className={styles.label}>
            Max Participants
          </label>
          <input
            type="number"
            id="create-maxParticipants"
            placeholder="e.g., 32"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className={styles.titleInput}
            min="2"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="create-numberOfRounds" className={styles.label}>
            Number of Rounds
          </label>
          <input
            type="number"
            id="create-numberOfRounds"
            placeholder="e.g., 5"
            value={numberOfRounds}
            onChange={(e) => setNumberOfRounds(e.target.value)}
            className={styles.titleInput}
            min="1"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="create-registrationDeadline" className={styles.label}>
            Registration Deadline
          </label>
          <input
            type="datetime-local"
            id="create-registrationDeadline"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            className={styles.titleInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="create-startTime" className={styles.label}>
            Tournament Start
          </label>
          <input
            type="datetime-local"
            id="create-startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={styles.titleInput}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="create-endTime" className={styles.label}>
          Tournament End (optional)
        </label>
        <input
          type="datetime-local"
          id="create-endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className={styles.titleInput}
        />
      </div>

      <button
        type="submit"
        disabled={!name || !startTime || createTournamentMutation.isPending}
        className={styles.submitButton}
      >
        {createTournamentMutation.isPending ? "Creating..." : "Create Tournament"}
      </button>

      {createTournamentMutation.isSuccess && (
        <div className={styles.successMessage}>
          ✓ Tournament created successfully!
        </div>
      )}
    </form>
  );
}
