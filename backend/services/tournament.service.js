import mongoose from "mongoose";

import { Tournament } from "../models/tournament.model.js";
import { generateRandomGroupName, throwCustomError } from "../util.js";

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
  return tournaments.filter((e) => !e.members.includes(user.username));
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
  await tournament.save()

  tournament.userTeam = groupName;
  return tournament;
}

export async function changeGroupName(req) {
  const tournament = await validateTournamentId(req.params.tid);
  
  const groupName = req.body.groupName;
  const newGroupName = req.body.newGroupName;

  if (!tournament.teams[groupName]) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (!tournament.teams[groupName].includes(req.user.username)) {
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

  const group = tournament.teams[req.body.groupName];

  if (!group) {
    throwCustomError("notFound", "Group cannot be found");
  }

  if (group.includes(req.user.username) && group.includes(req.body.kickedUser)) {
    group.splice(group.indexOf(req.body.kickedUser), 1);

    if (!group.length) {
      delete tournament.teams[req.body.groupName];
    }

    const groupName = getUniqueGroupName(tournament);
    tournament.teams[groupName] = [req.body.kickedUser];

    setUserInTournament(user, await tournament.save());
    return tournament;
  }

  throwCustomError("badKick", "Unauthorized Kick");
}

export async function removeUserFromTournament(req, userToRemove) {
  const tournament = await validateTournamentId(req.params.tid);

  if (req.user.username !== userToRemove && req.user.username !== tournament.host) {
    throwCustomError("unauth", "Unauthorized to remove user from tournament");
  }

  tournament.members.splice(tournament.members.indexOf(userToRemove), 1);

  // removes user from the team, deletes the team if needed
  for (const [teamName, team] of tournament.teams.entries()) {
    if (userToRemove.includes(team)) {
      console.log("removing user from", team);
      team.splice(team.indexOf(userToRemove), 1);
      if (team.length === 0) {
        tournament.teams.delete(teamName);
      }

      break;
    }
  }
  
  await tournament.save();
  tournament.userTeam = null;
  return tournament;
}
