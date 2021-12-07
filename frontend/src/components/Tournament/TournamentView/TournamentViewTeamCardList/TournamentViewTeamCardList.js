import {Grid} from "@mui/material";
import TournamentViewTeamCard from "./TournamentViewTeamCard/TournamentViewTeamCard";
import {uid} from "react-uid";

export default function TournamentViewTeamCardList(props) {
  return (
    <Grid container spacing={2}>
      {Object.entries(props.teams).map(([teamName, team]) => (
        <Grid item xs={3} key={uid(teamName)}>
          <TournamentViewTeamCard
            teamName={teamName}
            team={team}
            onNameUpdate={props.onNameUpdate ?? null}
            maxTeamMembers={props.maxTeamMembers}
            canUserJoin={props.canUserJoin}
            joinTeam={props.joinTeam}
            hideButton={props.hideButton}
          />
        </Grid>
      ))}
    </Grid>
  );
}