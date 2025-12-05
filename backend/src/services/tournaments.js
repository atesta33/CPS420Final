import { Tournament } from "../db/models/tournament.js";
import { User } from "../db/models/user.js";

export async function createTournament(userId, data) {
  const {
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
    ratingRequirement,
  } = data;

  let start = startTime ? new Date(startTime) : new Date();
  let end = endTime ? new Date(endTime) : undefined;
  let regDeadline = registrationDeadline ? new Date(registrationDeadline) : undefined;

  if (end && end <= start) {
    const error = new Error("End time must be after start time");
    error.status = 400;
    throw error;
  }

  if (regDeadline && regDeadline >= start) {
    const error = new Error("Registration deadline must be before start time");
    error.status = 400;
    throw error;
  }

  const tournament = await Tournament.create({
    name,
    description,
    rules,
    organizer: userId,
    format: format || "SWISS",
    timeControl: timeControl || "BLITZ",
    location,
    venue,
    maxParticipants: maxParticipants || 32,
    numberOfRounds: numberOfRounds || 5,
    participants: [],
    status: "REGISTRATION_OPEN",
    startTime: start,
    endTime: end,
    registrationDeadline: regDeadline,
    ratingRequirement,
  });

  return tournament;
}

async function listTournaments(
  query = {},
  { sortBy = "startTime", sortOrder = "ascending" } = {},
) {
  const dir = sortOrder === "ascending" ? 1 : -1;

  const q = Tournament.find(query).sort({ [sortBy]: dir });
  if (sortBy === "name") {
    q.collation({ locale: "en", strength: 2, numericOrdering: true });
  }
  return await q;
}

export async function listAllTournaments(options) {
  return await listTournaments({}, options);
}

export async function listTournamentsByOrganizer(organizerUsername, options) {
  const user = await User.findOne({ username: organizerUsername });
  if (!user) return [];
  return await listTournaments({ organizer: user._id }, options);
}

export async function listTournamentsByParticipant(participantId) {
  return await Tournament.find({
    "participants.player": participantId,
    "participants.status": "REGISTERED",
  }).sort({ startTime: 1 });
}

export async function getTournamentById(tournamentID) {
  return await Tournament.findById(tournamentID);
}

export async function updateTournament(
  userID,
  tournamentID,
  {
    name,
    description,
    rules,
    format,
    timeControl,
    location,
    venue,
    maxParticipants,
    numberOfRounds,
    status,
  },
) {
  return await Tournament.findOneAndUpdate(
    { _id: tournamentID, organizer: userID },
    {
      $set: {
        name,
        description,
        rules,
        format,
        timeControl,
        location,
        venue,
        maxParticipants,
        numberOfRounds,
        status,
      },
    },
    { new: true },
  );
}

export async function deleteTournament(userID, tournamentID) {
  return await Tournament.deleteOne({ _id: tournamentID, organizer: userID });
}

export async function registerForTournament(userId, tournamentId) {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error("Tournament not found");
    error.status = 404;
    throw error;
  }

  if (tournament.status !== "REGISTRATION_OPEN") {
    const error = new Error("Tournament registration is not open");
    error.status = 400;
    throw error;
  }

  const now = new Date();
  if (tournament.registrationDeadline && now > tournament.registrationDeadline) {
    const error = new Error("Registration deadline has passed");
    error.status = 400;
    throw error;
  }

  const activeParticipants = tournament.participants.filter(
    (p) => p.status === "REGISTERED",
  );

  if (activeParticipants.length >= tournament.maxParticipants) {
    const error = new Error("Tournament is full");
    error.status = 400;
    throw error;
  }

  const alreadyRegistered = tournament.participants.some(
    (p) => p.player.toString() === userId && p.status === "REGISTERED",
  );

  if (alreadyRegistered) {
    const error = new Error("Already registered for this tournament");
    error.status = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  tournament.participants.push({
    player: user._id,
    status: "REGISTERED",
  });

  await tournament.save();

  const updatedTournament = await Tournament.findById(tournament._id)
    .populate("organizer", "username")
    .populate("participants.player", "username")
    .lean();

  return updatedTournament;
}

export async function withdrawFromTournament(userId, tournamentId) {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error("Tournament not found");
    error.status = 404;
    throw error;
  }

  if (tournament.status === "ONGOING" || tournament.status === "COMPLETED") {
    const error = new Error("Cannot withdraw from ongoing or completed tournament");
    error.status = 400;
    throw error;
  }

  const participantIndex = tournament.participants.findIndex(
    (p) => p.player.toString() === userId && p.status === "REGISTERED",
  );

  if (participantIndex === -1) {
    const error = new Error("Not registered for this tournament");
    error.status = 400;
    throw error;
  }

  tournament.participants[participantIndex].status = "WITHDRAWN";

  await tournament.save();

  const updatedTournament = await Tournament.findById(tournament._id)
    .populate("organizer", "username")
    .populate("participants.player", "username")
    .lean();

  return updatedTournament;
}

export async function joinAsSpectator(userId, tournamentId) {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error("Tournament not found");
    error.status = 404;
    throw error;
  }

  const alreadySpectator = tournament.spectators?.some(
    (s) => s.user.toString() === userId,
  );

  if (alreadySpectator) {
    const error = new Error("Already joined as spectator");
    error.status = 400;
    throw error;
  }

  const alreadyParticipant = tournament.participants.some(
    (p) => p.player.toString() === userId && p.status === "REGISTERED",
  );

  if (alreadyParticipant) {
    const error = new Error("You are already registered as a participant");
    error.status = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!tournament.spectators) {
    tournament.spectators = [];
  }

  tournament.spectators.push({
    user: user._id,
  });

  await tournament.save();

  const updatedTournament = await Tournament.findById(tournament._id)
    .populate("organizer", "username")
    .populate("participants.player", "username")
    .populate("spectators.user", "username")
    .lean();

  return updatedTournament;
}

export async function leaveAsSpectator(userId, tournamentId) {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error("Tournament not found");
    error.status = 404;
    throw error;
  }

  const spectatorIndex = tournament.spectators?.findIndex(
    (s) => s.user.toString() === userId,
  );

  if (spectatorIndex === -1 || spectatorIndex === undefined) {
    const error = new Error("Not joined as spectator");
    error.status = 400;
    throw error;
  }

  tournament.spectators.splice(spectatorIndex, 1);

  await tournament.save();

  const updatedTournament = await Tournament.findById(tournament._id)
    .populate("organizer", "username")
    .populate("participants.player", "username")
    .populate("spectators.user", "username")
    .lean();

  return updatedTournament;
}
