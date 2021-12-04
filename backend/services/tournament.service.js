import { Tournament } from "../models/tournament.model";

function setUserInTournmanets(user, tournaments) {
  const tournaments = tournaments.map((tournament) => {
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

  return tournaments;
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

export async function createTournament(req) {
  const host = req.user.username;
  const { name, description, public, maxMembers, maxTeamMembers, status } =
    req.body;

  const tournament = new Tournament({
    name,
    description,
    public,
    maxMembers,
    maxTeamMembers,
    status,
    host,
  });

  return await tournament.save();
}
