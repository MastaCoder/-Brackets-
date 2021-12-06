import { Router } from "express";
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createTournament,
  getAttendingTournaments,
  getHostingTournaments,
  getTournamentById,
  joinTournament
} from "../services/tournament.service.js";
import { isMongoError } from "../util.js";

export const tournamentRouter = Router();

tournamentRouter.post("/", authenticate, async (req, res) => {
  try {
    await createTournament(req);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  }
});

tournamentRouter.get("/list/:which/:status", authenticate, async (req, res) => {
  try {
    let tournaments;
    let split_status = req.params.status.split(",");

    switch (req.params.which) {
      case "attending":
        tournaments = await getAttendingTournaments(req.user, split_status);
        break;
      case "hosting":
        tournaments = await getHostingTournaments(req.user, split_status);
        break;
      default:
        res.status(400).send({ msg: "Invalid request type" });
        return;
    }
    
    res.send({ tournaments });
  } catch (error) {
    console.log(error);
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  }
});

tournamentRouter.post("/join/:tid", authenticate, async (req, res) => {
  try {
    res.send({tournament : await joinTournament(req.user, req.params.tid)})
  } catch (error) {
    console.log(error);
    if (isMongoError(error)) {
      res.status(500).send({ msg: "Internal Server Error" });
    } else if (error.name == "badId") {
      res.status(400).send({ msg: error.msg})
    } else if (error.name == "notFound") {
      res.status(404).send({ msg: error.msg})
    } else {
      res.status(409).send({ msg: error.msg})
    }
  }
})

tournamentRouter.get("/details/:tid", authenticate, async (req, res) => {
  const id = req.params.tid;

  try {
    const tournament = await getTournamentById(req.user, id);
    if (!tournament)
      res.status(404).send({ msg: "Requested Tournament Not Found" });
    else
      res.send(tournament);
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
