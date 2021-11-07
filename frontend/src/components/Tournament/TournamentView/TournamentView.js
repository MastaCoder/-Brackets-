import {Box, Container, Typography} from "@mui/material";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import PageSubTitle from "../../Layout/PageSubTitle";
import TournamentViewUserChip from "./TournamentViewUserChip/TournamentViewUserChip";

export default function TournamentView(props) {
  if (!props.tournament.id) {
    return (
      <PageTitle>Event not found!</PageTitle>
    );
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
      <Box mt={2} mb={2}>
        <TournamentChips
          public={props.tournament.public}
          teamsCount={Object.keys(props.tournament.teams).length}
          status={props.tournament.status}
          membersCount={props.tournament.members.length}
          maxMembers={props.tournament.maxMembers}
          size="medium"
          justify="center"
        />
      </Box>

      {/* Members */}
      <PageSubTitle>
        Registered members
      </PageSubTitle>
      <Box mb={3}>
        <TournamentViewUserChip
          members={props.tournament.members}
          onKick={props.tournament.host === 'user' ? props.kickUser : null}
        />
      </Box>

      {/* Teams */}
      <PageSubTitle>
        Teams
      </PageSubTitle>
    </Container>
  )
}