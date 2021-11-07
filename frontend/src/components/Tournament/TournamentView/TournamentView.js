import {Box, Container, Grid, Typography} from "@mui/material";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import PageSubTitle from "../../Layout/PageSubTitle";
import TournamentViewUserChip from "./TournamentViewUserChip/TournamentViewUserChip";
import TournamentViewTeamCardList from "./TournamentViewTeamCardList/TournamentViewTeamCardList";
import TournamentViewTeamCard from "./TournamentViewTeamCardList/TournamentViewTeamCard/TournamentViewTeamCard";

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
      <Box textAlign="center">
        <Typography variant="body1">
          {props.tournament.description}
        </Typography>
        <Typography variant="body1">
          Host: <strong>{props.tournament.host}</strong>
        </Typography>
      </Box>
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

      {/* Your team */}
      {props.tournament.userTeam !== null && (
        <>
          <PageSubTitle>
            Your Team
          </PageSubTitle>
          <Grid container mb={3}>
            <Grid item xs={3}>
              <TournamentViewTeamCard
                teamName={props.tournament.userTeam}
                team={props.tournament.teams[props.tournament.userTeam]}
                onKick={props.tournament.status !== 2 ? props.kickFromTeam : null}
                onNameUpdate={props.tournament.status !== 2 ? props.onNameUpdate : null}
              />
            </Grid>
          </Grid>
        </>
      )}

      {/* Members */}
      <PageSubTitle>
        Registered members
      </PageSubTitle>
      <Box mb={3}>
        <TournamentViewUserChip
          members={props.tournament.members}
          onKick={props.tournament.host === 'user' ? props.kickUser : null}
          onNameUpdate={props.tournament.host === 'user' ? props.onNameUpdate : null}
          size="medium"
        />
      </Box>

      {/* Teams */}
      <PageSubTitle>
        Teams
      </PageSubTitle>
      <TournamentViewTeamCardList
        teams={props.tournament.teams}
      />
    </Container>
  )
}