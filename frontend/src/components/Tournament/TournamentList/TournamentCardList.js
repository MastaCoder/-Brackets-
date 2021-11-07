import {Grid, Typography} from "@mui/material";
import TournamentCard from "./TournamentCard/TournamentCard";

export default function TournamentCardList(props) {
  return (
    <Grid container spacing={2}>
      {props.cards.length > 0 ? (
        props.cards.map((e) => (
          <Grid xs={12} md={6} lg={4} item>
            <TournamentCard
              id={e.id}
              title={e.name}
              description={e.description}
              public={e.public}
              membersCount={e.members.length}
              maxMembers={e.maxMembers}
              teamsCount={Object.keys(e.teams).length}
              status={e.status}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography component="body1">
            We searched everywhere but found no events were found. 🔎
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
