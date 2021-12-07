import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../hooks/Auth";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import TournamentViewBrackets from "./TournamentViewBrackets/TournamentViewBrackets";
import TournamentViewDetails from "./TournamentViewDetails/TournamentViewDetails";

export default function TournamentView(props) {
  const { user } = useAuth();

  const [tournamentView, setTournamentView] = useState(false);

  if (props.tournament === null) {
    return (
      <>
        <PageTitle>
          Event not found!
        </PageTitle>
        <Typography variant="body1" textAlign="center">
          Make sure you're visiting the correct link.
        </Typography>
      </>
    );
  }

  const eventJoinable = props.tournament.userTeam === null && !props.tournament.status &&
    props.tournament.host !== user.username;

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <PageTitle>{props.tournament.name}</PageTitle>
      <Box textAlign="center">
        <Typography variant="body1">{props.tournament.description}</Typography>
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
      <Box display="flex" justifyContent="center" gap={1}>
        {eventJoinable && (
          <Box>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={() => props.joinTournament()}
            >
              Join event
            </Button>
          </Box>
        )}
        {props.tournament.status > 0 && (
          <Box>
            <Button
              size="large"
              variant="contained"
              color={tournamentView ? 'secondary' : 'info'}
              onClick={() => setTournamentView(!tournamentView)}
            >
              View Tournament {tournamentView ? 'Details' : 'Bracket'}
            </Button>
          </Box>
        )}
        {props.tournament.userTeam !== null && (
          <Box>
            <Button
              size="large"
              variant="contained"
              color={"warning"}
              onClick={() => props.kickTournament(user.username)}
            >
              Leave event
            </Button>
          </Box>
        )}
      </Box>

      {tournamentView ? (
        <TournamentViewBrackets
          tournament={props.tournament}
          nextBracket={props.nextBracket}
        />
      ) : (
        <TournamentViewDetails
          teamNameChange={props.teamNameChange}
          teamKick={props.teamKick}
          tournament={props.tournament}
          kickTournament={props.kickTournament}
          joinTeam={props.joinTeam}
          regenerateLink={props.regenerateLink}
          deleteTournament={props.deleteTournament}
          updateTournament={props.updateTournament}
          nextStage={props.nextStage}
        />
      )}
    </Container>
  );
}
