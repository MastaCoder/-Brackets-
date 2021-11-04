import {Grid, Typography} from "@mui/material";
import TournamentCard from "./TournamentCard/TournamentCard";

export default function TournamentCardList(props) {
  return (
    <Grid container spacing={2}>
      {props.cards.length > 0 ? (
        <Grid sm={6} md={4} item>
          {props.cards.map((e, i) => (
            <TournamentCard
              id={e.id}
              title={e.name}
              description={e.description}
              public={e.public}
              members={e.members}
              teams={e.teams}
              status={e.status}
            />
          ))}
        </Grid>
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
