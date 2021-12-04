import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getTournamentById,
  getTournaments,
  createTournament,
} from "../services/tournament.service";
import { isMongoError, isValidId } from "../util";

export const tournamentRouter = Router();

tournamentRouter.get("/:filter", authenticate, async (req, res) => {
  try {
    const tournaments = await getTournaments(req.user, parseInt(req.params.filter));
    res.send({ tournaments });
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  }
});

tournamentRouter.get("/:tid", authenticate, async (req, res) => {
  const id = req.params.tid;

  if (!isValidId(res, id)) return;

  try {
    const tournament = await getTournamentById(req.user, id);
    if (!tournament) {
      res.status(404).send({ msg: "Requested Tournament Not Found" });
    }
    res.send(tournament);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  }
});

tournamentRouter.post("/", authenticate, async (req, res) => {
  try {
    return await createTournament(req);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  }
});

tournamentRouter.patch("/:tid", authenticate, async (req, res) => {});

tournamentRouter.post("/:tid/addBracket", authenticate, async (req, res) => {});
