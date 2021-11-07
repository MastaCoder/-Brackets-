import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
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
      <Box my={2}>
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
      {props.tournament.userTeam === null && !props.tournament.status && props.tournament.public && (
        <Box textAlign="center" my={2}>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={() => alert("To be implemented in phase 2")}
          >
            Join event
          </Button>
        </Box>
      )}

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
                onKick={props.tournament.status !== 2 ? props.onKickFromTeam : null}
                onNameUpdate={props.tournament.status !== 2 ? props.onTeamNameUpdate : null}
              />
            </Grid>
          </Grid>
          <Box maxWidth={500} mb={3}>
            <TextField
              id="outlined-basic"
              label="Team invite link (not functional - phase 2)"
              variant="outlined"
              defaultValue="http://localhost:3000/tournament/1/team/jsk18Z01kM23"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </>
      )}

      {/* Members */}
      <PageSubTitle>
        Registered members
      </PageSubTitle>
      <Box mb={3}>
        <TournamentViewUserChip
          members={props.tournament.members}
          onKick={props.tournament.host === 'user' ? props.onKickUser : null}
          onNameUpdate={props.tournament.host === 'user' ? props.onTeamNameUpdate : null}
          size="medium"
        />
      </Box>

      {/* Teams */}
      <PageSubTitle>
        Teams
      </PageSubTitle>
      <TournamentViewTeamCardList
        teams={props.tournament.teams}
        canUserJoin={props.tournament.userTeam !== null}
        maxTeamMembers={props.tournament.maxTeamMembers}
      />

      {/* Settings */}
      {props.tournament.host === 'user' && (
        <Box>
          <PageSubTitle>
            Event Settings
          </PageSubTitle>
          
        </Box>
      )}
    </Container>
  )
}