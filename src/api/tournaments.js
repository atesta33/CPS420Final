export const getTournaments = async (queryParams) => {
  try {
    const url = new URL("tournaments", import.meta.env.VITE_BACKEND_URL);

    Object.entries(queryParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString());
    return await res.json();
  } catch (error) {
    console.error("Error fetching tournaments:", error);
  }
};

export const getTournamentById = async (tournamentId) => {
  const url = new URL(`tournaments/${tournamentId}`, import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to load tournament (${res.status}): ${text || "unknown error"}`,
    );
  }

  return res.json();
};

export const createTournament = async (
  token,
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
    registrationDeadline,
    startTime,
    endTime,
  },
) => {
  const url = new URL("tournaments", import.meta.env.VITE_BACKEND_URL);

  const body = {
    name,
    description,
    rules,
    format,
    timeControl,
    location,
    venue,
    ...(maxParticipants !== undefined &&
      maxParticipants !== "" && {
        maxParticipants: Number(maxParticipants),
      }),
    ...(numberOfRounds !== undefined &&
      numberOfRounds !== "" && {
        numberOfRounds: Number(numberOfRounds),
      }),
    ...(registrationDeadline && { registrationDeadline }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
  };

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to create tournament");
  }

  return res.json();
};

export const registerForTournament = async (token, tournamentId) => {
  const url = new URL(`tournaments/${tournamentId}/register`, import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to register for tournament");
  }

  return res.json();
};

export const withdrawFromTournament = async (token, tournamentId) => {
  const url = new URL(`tournaments/${tournamentId}/withdraw`, import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to withdraw from tournament");
  }

  return res.json();
};
