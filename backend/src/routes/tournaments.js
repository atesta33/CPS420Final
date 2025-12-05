import {
  listAllTournaments,
  listTournamentsByOrganizer,
  listTournamentsByParticipant,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerForTournament,
  withdrawFromTournament,
  joinAsSpectator,
  leaveAsSpectator,
} from "../services/tournaments.js";

import { requireAuth } from "../middleware/jwt.js";

export function tournamentsRoutes(app) {
  app.get("/api/v1/tournaments", async (req, res) => {
    const { sortBy, sortOrder, organizer, participant } = req.query;
    const options = { sortBy, sortOrder };
    try {
      if (organizer && participant) {
        return res
          .status(400)
          .json("Please filter by only one parameter: organizer or participant");
      } else if (organizer) {
        return res.json(await listTournamentsByOrganizer(organizer, options));
      } else if (participant) {
        return res.json(await listTournamentsByParticipant(participant, options));
      } else {
        return res.json(await listAllTournaments(options));
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      return res.status(500).end();
    }
  });

  app.get("/api/v1/tournaments/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const tournament = await getTournamentById(id);
      if (tournament == null) return res.status(404).end();
      return res.json(tournament);
    } catch (error) {
      console.error("Error fetching tournament by ID:", error);
      return res.status(500).end();
    }
  });

  app.post("/api/v1/tournaments/", requireAuth, async (req, res) => {
    try {
      const tournament = await createTournament(req.auth.sub, req.body);
      return res.json(tournament);
    } catch (error) {
      console.error("Error creating tournament:", error);
      return res.status(500).end();
    }
  });

  app.patch("/api/v1/tournaments/:id", requireAuth, async (req, res) => {
    try {
      const tournament = await updateTournament(req.auth.sub, req.params.id, req.body);
      return res.json(tournament);
    } catch (error) {
      console.error("Error updating tournament:", error);
      return res.status(500).end();
    }
  });

  app.delete("/api/v1/tournaments/:id", requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteTournament(req.auth.sub, req.params.id);
      if (deletedCount === 0) return res.status(404).end();
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting tournament:", error);
      return res.status(500).end();
    }
  });

  app.post("/api/v1/tournaments/:id/register", requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
      const tournament = await registerForTournament(req.auth.sub, id);
      return res.json(tournament);
    } catch (error) {
      console.error("Error registering for tournament:", error);
      if (error.status) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(500).end();
    }
  });

  app.post("/api/v1/tournaments/:id/withdraw", requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
      const tournament = await withdrawFromTournament(req.auth.sub, id);
      return res.json(tournament);
    } catch (error) {
      console.error("Error withdrawing from tournament:", error);
      if (error.status) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(500).end();
    }
  });

  app.post("/api/v1/tournaments/:id/spectate", requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
      const tournament = await joinAsSpectator(req.auth.sub, id);
      return res.json(tournament);
    } catch (error) {
      console.error("Error joining as spectator:", error);
      if (error.status) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(500).end();
    }
  });

  app.post("/api/v1/tournaments/:id/unspectate", requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
      const tournament = await leaveAsSpectator(req.auth.sub, id);
      return res.json(tournament);
    } catch (error) {
      console.error("Error leaving as spectator:", error);
      if (error.status) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(500).end();
    }
  });
}
