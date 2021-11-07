import TournamentView from "../../../components/Tournament/TournamentView/TournamentView";
import {useContext} from "react";
import DataContext from "../../../contexts/dataContext";
import PageTitle from "../../../components/Layout/PageTitle";
import {Typography} from "@mui/material";

export default function TournamentViewPage(props) {
  const [data, setData] = useContext(DataContext);
  const index = parseInt(props.match.params.id) - 1;

  // Here would be some sort of API middleman, but for phase 1
  // we're just hardcoding in events
  if (index > data.tournaments.length) {
    return (
      <>
        <PageTitle>
          Event not found!
        </PageTitle>
        <Typography variant="body1">
          Make sure you're visiting the correct link.
        </Typography>
      </>
    );
  }

  // kick a user, to be replaced with an API call in the future
  const kickUser = (userName) => {
    let tournaments = [...data.tournaments];
    tournaments[index].members = tournaments[index].members.filter(e => e !== userName);
    for (const [teamName, team] of Object.entries(tournaments[index].teams)) {
      let userIndex = team.indexOf(userName);
      if (userIndex > -1) {
        team.splice(userIndex, 1);
        if (team.length === 0)
          delete tournaments[index].teams[teamName];

        break;
      }
    }

    setData({ ...data, tournaments: tournaments });
  }

  // kicks a user from a team, forms their own new team
  const onKickFromTeam = (userName) => {
    if (userName === 'user') {
      alert("You can't kick yourself!");
      return;
    }

    let tournaments = [...data.tournaments];
    for (const [teamName] of Object.entries(tournaments[index].teams)) {
      let userIndex = tournaments[index].teams[teamName].indexOf(userName);
      if (userIndex > -1) {
        tournaments[index].teams[teamName].splice(userIndex, 1);
        break;
      }
    }

    tournaments[index].teams[userName] = [userName];
    setData({ ...data, tournaments: tournaments });
  }

  // Update the name of a team
  const onNameUpdate = (oldName, newName) => {
    let tournaments = [...data.tournaments];
    tournaments[index].teams[newName] = tournaments[index].teams[oldName];
    delete tournaments[index].teams[oldName];
    if (tournaments[index].userTeam === oldName)
      tournaments[index].userTeam = newName;

    setData({ ...data, tournaments: tournaments });
  }

  return (
    <TournamentView
      tournament={data.tournaments[index]}
      onKickUser={kickUser}
      onKickFromTeam={onKickFromTeam}
      onTeamNameUpdate={onNameUpdate}
    />
  );
}