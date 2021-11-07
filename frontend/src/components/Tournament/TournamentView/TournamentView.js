import {Box, Container, Typography} from "@mui/material";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import PageSubTitle from "../../Layout/PageSubTitle";

export default function TournamentView(props) {
  if (!props.tournament.id) {
    return (
      <PageTitle>Event not found!</PageTitle>
    );
  }

  // Remove user callback
  const removeUser = (e) => {
    console.log(e);
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <PageTitle>
        {props.tournament.name}
      </PageTitle>
      <Typography variant="body1" textAlign="center">
        {props.tournament.description}
      </Typography>
      <Box mt={2}>
        <TournamentChips
          public={props.tournament.public}
          maxTeams={props.tournament.maxTeams}
          status={props.tournament.status}
          maxMembers={props.tournament.maxMembers}
          size="medium"
          justify="center"
        />
      </Box>

      {/* Members */}
      <PageSubTitle>
        Registered members
      </PageSubTitle>
    </Container>
  )
}