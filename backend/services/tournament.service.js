import mongoose from "mongoose";

import { Tournament } from "../models/tournament.model.js";
import { generateRandomGroupName, throwCustomError } from "../util.js";

// helpers

async function validateTournamentId(id) {
  if (!mongoose.isValidObjectId(id)) {
    throwCustomError("badId", "Invalid Tournament Id");
  }

  const tournament = await Tournament.findById(id);

  if (!tournament) {
    throwCustomError("notFound", "Tournament cannot be found with id");
  }

  return tournament;
}

function generateStartUpBracket(tournament) {
  const pool = [...tournament.teams.keys()];
  const bracket = [];
  while (pool.length) {
    const matchUp = [];
    let choice = Math.floor(Math.random() * pool.length);
    matchUp.push(pool[choice]);
    pool.splice(choice, 1);

    if (!pool.length) {
      matchUp.push(null);
    } else {
      choice = Math.floor(Math.random() * pool.length);
      matchUp.push(pool[choice]);
      pool.splice(choice, 1);
    }

    bracket.push(matchUp);
    // console.log("pushing", bracket);
  }

  return bracket;
}

function getUniqueGroupName(tournament) {
  let groupName = generateRandomGroupName();

  while (groupName in tournament.teams) {
    groupName = generateRandomGroupName();
  }

  return groupName;
}

async function getTournamentList(status) {
  const statuses = [0, 1, 2];

  if (status.includes(-1)) return await Tournament.find();

  let parsedStatus = status.map((e) => {
    e = parseInt(e);
    if (!statuses.includes(e)) {
      throw Error("Invalid status type");
    }

    return { status: e };
  });

  return await Tournament.find({ $or: parsedStatus });
}

async function kickFromTeam(userToRemove, tournament) {
  for (const [teamName, team] of tournament.teams.entries()) {
    if (team.includes(userToRemove)) {
      team.splice(team.indexOf(userToRemove), 1);
      if (team.length === 0) {
        tournament.teams.delete(teamName);
      }

      break;
    }
  }
}

// main

export async function getAttendingTournaments(user, status) {
  const tournaments = (await getTournamentList(status)).filter((e) =>
    e.members.includes(user.username)
  );

  return tournaments.map((tournament) => {
    for (const [teamName, team] of tournament.teams.entries()) {
      if (team.includes(user.username)) {
        tournament.userTeam = teamName;
        return tournament;
      }
    }

    return tournament;
  });
}

export async function getHostingTournaments(user, status) {
  const tournaments = await getTournamentList(status);
  return tournaments.filter((e) => e.host === user.username);
}

export async function getTournaments(status) {
  return await getTournamentList(status);
}

export async function getPublicTournaments(user, status) {
  const tournaments = await getTournamentList(status);
  return tournaments.filter(
    (e) =>
      !e.members.includes(user.username) && e.host !== user.username && e.public
  );
}

export async function getTournamentById(user, id) {
  const tournament = await Tournament.findById(id);
  tournament.userTeam = null;

  for (const [teamName, team] of tournament.teams.entries()) {
    if (team.includes(user.username)) {
      tournament.userTeam = teamName;
      break;
    }
  }

  return tournament;
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
    status: 0,
    host: req.user.username,
  });

  return await tournament.save();
}

export async function joinTournament(user, tid) {
  const tournament = await validateTournamentId(tid);

  if (tournament.members.includes(user.username)) {
    throwCustomError("badId", "User in tournament already");
  }

  let groupName = getUniqueGroupName(tournament);

  if (tournament.members.length + 1 > tournament.maxMembers) {
    throwCustomError("limit", "Not enough capacity");
  }

  tournament.members.push(user.username);
  tournament.teams.set(groupName, [user.username]);
  await tournament.save();

  tournament.userTeam = groupName;
  return tournament;
}

export async function changeGroupName(req) {
  const tournament = await validateTournamentId(req.params.tid);

  const groupName = req.body.groupName;
  const newGroupName = req.body.newGroupName;

  if (tournament.teams.get(newGroupName)) {
    throwCustomError("exists", "Group already exists");
  }

  if (!tournament.teams.get(groupName)) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (!tournament.teams.get(groupName).includes(req.user.username)) {
    throwCustomError("unauth", "Unauthorized group name change");
  }

  tournament.teams.set(newGroupName, tournament.teams.get(groupName));
  tournament.teams.delete(groupName);
  await tournament.save();

  tournament.userTeam = newGroupName;
  return tournament;
}

export async function kickUserFromGroup(req) {
  const tournament = await validateTournamentId(req.params.tid);

  const groupName = req.body.groupName;
  const kickedUser = req.body.kickedUser;

  if (!tournament.teams.get(groupName)) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (!tournament.teams.get(groupName).includes(req.user.username)) {
    throwCustomError("unauth", "Unauthorized group kick");
  }

  kickFromTeam(kickedUser, tournament);
  const newTeam = getUniqueGroupName(tournament);

  tournament.teams.set(newTeam, [kickedUser]);
  await tournament.save();

  tournament.userTeam = groupName;
  if (kickedUser === req.user.username) tournament.userTeam = newTeam;

  return tournament;
}

export async function removeUserFromTournament(req, userToRemove) {
  const tournament = await validateTournamentId(req.params.tid);

  if (
    req.user.username !== userToRemove &&
    req.user.username !== tournament.host
  ) {
    throwCustomError("unauth", "Unauthorized to remove user from tournament");
  }

  tournament.members.splice(tournament.members.indexOf(userToRemove), 1);

  // removes user from the team, deletes the team if needed
  kickFromTeam(userToRemove, tournament);

  await tournament.save();
  tournament.userTeam = null;
  return tournament;
}

export async function regenerateTournamentId(tid) {
  const tournament = await validateTournamentId(tid);

  if (tournament.status !== 0) {
    throwCustomError("statusError", "Tournament not in opening status");
  }

  const newTournament = new Tournament({
    name: tournament.name,
    description: tournament.description,
    public: tournament.public,
    maxMembers: tournament.maxMembers,
    maxTeamMembers: tournament.maxTeamMembers,
    status: 0,
    host: tournament.host,
    teams: tournament.teams,
  });

  await tournament.remove();
  await newTournament.save();
  return newTournament._id;
}

export async function joinTournamentTeam(user, groupName, tid) {
  const tournament = await validateTournamentId(tid);
  const team = tournament.teams.get(groupName);

  if (!tournament.members.includes(user.username)) {
    throwCustomError("badId", "User not in tournament");
  }

  if (team.includes(user.username)) {
    throwCustomError("conflict", "Already in this team");
  }

  if (team.length >= tournament.maxTeamMembers) {
    throwCustomError("maxlimit", "Team limit size exceeded");
  }

  kickFromTeam(user.username, tournament);
  team.push(user.username);
  await tournament.save();

  tournament.userTeam = groupName;

  return tournament;
}

export async function removeTournament(user, tid) {
  const tournament = await validateTournamentId(tid);

  if (user.type === "admin" || user.username === tournament.host) {
    await tournament.remove();
  } else {
    throwCustomError("unauth", "Unauthorized to remove tournament");
  }
}

export async function updateTournamentInfo(req) {
  const tid = req.params.tid;
  const tournament = await validateTournamentId(tid);

  if (tournament.host !== req.user.username || req.user.type !== "admin") {
    throwCustomError("unauth", "Unauthorized to update tournament");
  }

  tournament.description = req.body.description;
  tournament.public = req.body.public;
  await tournament.save();
  tournament.userTeam = null;

  return tournament;
}

export async function updateTournamentStatus(req) {
  const tid = req.params.tid;
  const tournament = await validateTournamentId(tid);

  if (tournament.host !== req.user.username || req.user.type !== "admin") {
    throwCustomError("unauth", "Unauthorized to update tournament");
  }

  if (tournament.status === 2) {
    throwCustomError("badstatus", "Tournament has already ended");
  }

  if (tournament.status === 0) {
    const bracket = generateStartUpBracket(tournament);
    console.log(bracket);
    tournament.brackets.push(bracket);
  }

  tournament.status += 1;
  await tournament.save();
  tournament.userTeam = null;

  return tournament;
}

export async function proceedNextBracket(req) {
  const tid = req.params.tid;
  const tournament = await validateTournamentId(tid);
  const proceedingTeams = req.body.proceedingTeams;

  if (tournament.host !== req.user.username || req.user.type !== "admin") {
    throwCustomError("unauth", "Unauthorized to update tournament");
  }

  if (proceedingTeams.length === undefined) {
    throwCustomError("badrequest", "Advancing teams is not an array");
  }

  if (proceedingTeams.length === 1) {
    proceedingTeams.push(null);
    tournament.brackets.push([ proceedingTeams ]);
    await tournament.save();
    console.log(proceedingTeams);
    return await updateTournamentStatus(req);
  }

  const lastBracket = tournament.brackets.at(-1);
  const bracket = []
  
  for (let i = 0; i < proceedingTeams.length; i += 2) {
    const matchUp = []

    if (!(tournament.teams.get(proceedingTeams[i]))) {
      throwCustomError("badrequest", "Team not in tournament");
    }
  
    if (!(lastBracket[i].includes(proceedingTeams[i]))) {
      throwCustomError("badrequest", "Invalid proceeding team");
    }

    matchUp.push(proceedingTeams[i]);

    if (!proceedingTeams.at(i + 1)){
      matchUp.push(null);
    } else {
      matchUp.push(proceedingTeams[i+1]);
    }

    bracket.push(matchUp);
  }

  tournament.brackets.push(bracket);
  await tournament.save();

  tournament.userTeam = null;
  return tournament;

}
