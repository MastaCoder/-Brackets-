import mongoose from "mongoose";

import { Tournament } from "../models/tournament.model.js";
import { generateRandomGroupName, throwCustomError } from "../util.js";

function setUserInTournament(user, tournament) {
  for (const [teamName, team] of tournament.teams.entries()) {
    if (team.includes(user.username)) {
      tournament.userTeam = teamName;
      return true;
    }

    return false;
  }
}

function getUniqueGroupName(tournament) {
  let groupName = generateRandomGroupName();

  while (!tournament.teams[groupName]) {
    groupName = generateRandomGroupName();
  }

  return groupName;
}

async function getTournamentList(status) {
  if (status.includes(-1)) return await Tournament.find();

  let parsedStatus = parseInt(status);

  return await Tournament.find({status: parsedStatus});
}

export async function getAttendingTournaments(user, status) {
  const tournaments = (await getTournamentList(status)).filter((e) =>
    e.members.includes(user.username)
  );

  return tournaments.map((tournament) => {
    for (const [teamName, team] of tournament.teams.entries()) {
      if (team.includes(user.username)) tournament.userTeam = teamName;

      return tournament;
    }
  });
}

export async function getHostingTournaments(user, status) {
  const tournaments = await getTournamentList(status);
  return tournaments.filter((e) => e.host === user.username);
}

export async function getTournaments(status) {
  return await getTournamentList(status);
}

export async function getPublicTournaments(status) {
  const tournaments = getTournamentList(status);
  return tournaments.filter((e) => !e.members.includes(e.username));
}

export async function getTournamentById(user, id) {
  const tournament = await Tournament.findById(id);
  tournament.userTeam = null;

  for (const [teamName, team] of tournament.teams.entries()) {
    if (team.includes(user.username)) tournament.userTeam = teamName;
    break;
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
  if (!mongoose.ObjectId.isValid(tid)) {
    throwCustomError("badId", "Invalid Tournament Id");
  }

  const tournament = await Tournament.findById(tid);

  if (!tournament) {
    throwCustomError("notFound", "Tournament cannot be found with id");
  }

  const userTeam = tournament.teams.keys().map((key) => {
    return tournament.teams[key].includes(user.username);
  })

  if (!userTeam.length) {
    throwCustomError("badId", "User in tournament already");
  }


  let groupName = getUniqueGroupName(tournament);

  if (tournament.members.length + 1 > tournament.maxMembers) {
    throwCustomError("limit", "Not enough capacity");
  }

  tournament.members.push(user.username);
  tournament.teams[groupName] = [user.username];
  setUserInTournament(user, await tournament.save());
  return tournament;
}

export async function changeGroupName(req) {
  if (!mongoose.ObjectId.isValid(req.params.tid)) {
    throwCustomError("badId", "Invalid Tournament Id");
  }

  const tournament = await Tournament.findById(req.params.tid);

  if (!tournament) {
    throwCustomError("notFound", "Tournament cannot be found with id");
  }

  if (!tournament.teams[req.groupName]) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (!tournament.teams[req.groupName].includes(req.user.username)) {
    throwCustomError("unauth", "Unauthorized group name change");
  }

  delete tournament.teams.assign({
    [req.newGroupName]: tournament.teams[req.groupName],
  })[req.groupName];

  setUserInTournament(user, await tournament.save());
  return tournament;
}

export async function kickUserFromTournament(req) {
  if (!mongoose.ObjectId.isValid(req.params.tid)) {
    throwCustomError("badId", "Invalid Tournament Id");
  }

  const tournament = await Tournament.findById(req.params.tid);

  if (!tournament) {
    throwCustomError("notFound", "Tournament cannot be found with id");
  }

  const group = tournament.teams[req.groupName];

  if (!group) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (group.includes(req.user.username) && group.includes(req.kickedUser)) {
    group.splice(group.indexOf(req.kickedUser), 1);

    if (!group.length) {
      delete tournament.teams[req.groupName];
    }

    const groupName = getUniqueGroupName(tournament);
    tournament.teams[groupName] = [req.kickedUser];

    setUserInTournament(user, await tournament.save());
    return tournament;
  }

  throwCustomError("badKick", "Unauthorized Kick");
}
