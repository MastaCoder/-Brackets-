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

    setData({ ...data, tournaments: tournaments })
  }

  return (
    <TournamentView
      tournament={data.tournaments[index]}
      kickUser={kickUser}
    />
  );
}