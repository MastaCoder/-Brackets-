import { Tournament } from "../models/tournament.model.js";

function setUserInTournmanets(user, tournaments) {
  return tournaments.map((tournament) => {
    for (team in tournament.teams) {
      if (tournament.teams[team].includes(user.username)) {
        tournament.userTeam = team;
        return tournament;
      }
    }

    if ((!tournament.public && user.type === "admin") || tournament.public) {
      return tournament;
    }
  });
}

export async function getTournaments(user, status) {
  const statuses = [-1, 0, 1, 2];

  if (!statuses.includes(status)) {
    throw Error("Bad Request");
  }

  const tournaments = await Tournament.find(
    status !== -1 ? { status } : {}
  );
  return setUserInTournmanets(user, tournaments);
}

export async function getTournamentById(user, id) {
  const tournament = Tournament.findById(id);
  return setUserInTournmanets(user, [tournament]);
}

export async function getNumTournaments() {
  return {
    open: (await Tournament.find({ status: 0 })).length,
    ongoing: (await Tournament.find({ status: 1 })).length,
    closed: (await Tournament.find({ status: 2 })).length,
  };
}

export async function createTournament(req) {
  const tournament = new Tournament({
    name: req.body.name,
    description: req.body.description,
    public: req.body.public,
    maxMembers: req.body.maxMembers,
    maxTeamMembers: req.body.maxTeamMembers,
    status: req.body.status,
    host: req.user.username,
  });
  return await tournament.save();
}