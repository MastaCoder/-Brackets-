import {Grid, Skeleton, Typography} from "@mui/material";
import TournamentCard from "./TournamentCard/TournamentCard";
import {uid} from "react-uid";

export default function TournamentCardList(props) {
  if (props.cards === null) {
    return (
      <Grid container spacing={2}>
        {[...Array(3)].map((e, i) => (
          <Grid key={uid(i)} xs={12} md={6} lg={4} item>
            <Skeleton
              variant="rectangular"
              height={177}
              sx={{ borderRadius: 1 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {props.cards.length > 0 ? (
        props.cards.map((e) => (
          <Grid key={uid(e)} xs={12} md={6} lg={4} item>
            <TournamentCard
              id={e._id}
              title={e.name}
              description={e.description}
              public={e.public}
              membersCount={e.members.length}
              maxMembers={e.maxMembers}
              teamsCount={Object.keys(e.teams).length}
              status={e.status}
              host={e.host}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">
            We searched everywhere but found no events were found. 🔎
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
