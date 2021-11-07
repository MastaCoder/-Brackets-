import {Grid} from "@mui/material";
import TournamentViewTeamCard from "./TournamentViewTeamCard/TournamentViewTeamCard";

export default function TournamentViewTeamCardList(props) {
  return (
    <Grid container spacing={2}>
      {Object.entries(props.teams).map(([teamName, team]) => (
        <Grid item xs={3}>
          <TournamentViewTeamCard
            teamName={teamName}
            team={team}
            onNameUpdate={props.onNameUpdate ?? null}
            maxTeamMembers={props.maxTeamMembers}
            canUserJoin={props.canUserJoin}
          />
        </Grid>
      ))}
    </Grid>
  );
}