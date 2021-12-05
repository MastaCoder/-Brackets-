import { Router } from "express";
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createTournament,
  getAttendingTournaments,
  getHostingTournaments,
} from "../services/tournament.service.js";
import { isMongoError, isValidId } from "../util.js";

export const tournamentRouter = Router();

tournamentRouter.post("/", authenticate, async (req, res) => {
  try {
    await createTournament(req);
    res.send(req.body);
  } catch (error) {
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
    switch (req.params.which) {
      case "attending":
        tournaments = await getAttendingTournaments(req.user, parseInt(req.params.status));
        break;
      case "hosting":
        tournaments = await getHostingTournaments(req.user, parseInt(req.params.status));
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

// tournamentRouter.get("/:tid", authenticate, async (req, res) => {
//   const id = req.params.tid;

//   if (!isValidId(res, id)) return;

//   try {
//     const tournament = await getTournamentById(req.user, id);
//     if (!tournament) {
//       res.status(404).send({ msg: "Requested Tournament Not Found" });
//     }
//     res.send(tournament);
//   } catch (error) {
//     if (isMongoError(error)) {
//       res.status(500).send({ msg: "Internal Server Error" });
//     } else {
//       res.status(400).send({ msg: "Bad Request" });
//     }
//   }
// });

tournamentRouter.patch("/:tid", authenticate, async (req, res) => {});

tournamentRouter.post("/:tid/addBracket", authenticate, async (req, res) => {});
