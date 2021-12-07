import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import PageSubTitle from "../../Layout/PageSubTitle";
import TournamentViewUserChip from "./TournamentViewUserChip/TournamentViewUserChip";
import TournamentViewTeamCardList from "./TournamentViewTeamCardList/TournamentViewTeamCardList";
import TournamentViewTeamCard from "./TournamentViewTeamCardList/TournamentViewTeamCard/TournamentViewTeamCard";
import TournamentUpdateModal from "./TournamentUpdateModal/TournamentUpdateModal";
import TournamentViewBrackets from "./TournamentViewBrackets/TournamentViewBrackets";
import {useState, useContext} from "react";
import DataContext from "../../../contexts/dataContext";
import {useAuth} from "../../../hooks/Auth";

export default function TournamentView(props) {
  const { user } = useAuth();

  const [tournamentView, setTournamentView] = useState(false);
  const [data, setData] = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // const handleStartTournamentClk = () => {
  //   const tournaments = [...data.tournaments];
  //   tournaments[props.tournament.id - 1].status = 1;
  //   setData({...data, tournaments})
  // }

  const handleEndTournamentClk = () => {
    const tournaments = [...data.tournaments];
    tournaments[props.tournament.id - 1].status = 2;
    setData({...data, tournaments})
  }

  const eventJoinable = props.tournament.userTeam === null && !props.tournament.status && props.tournament.public &&
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
        />
      ) : (
        <>
          {/*phase 2, put in its own component*/}
          {(props.tournament.userTeam !== null) && (
            <>
              <PageSubTitle>
                Your Team
              </PageSubTitle>
              <Grid container mb={3}>
                <Grid item xs={3}>
                  <TournamentViewTeamCard
                    teamName={props.tournament.userTeam}
                    team={props.tournament.teams[props.tournament.userTeam]}
                    teamNameChange={props.tournament.status !== 2 ? props.teamNameChange : null}
                    hideButton={true}
                    onKick={props.tournament.status !== 2 ? props.teamKick : null}
                  />
                </Grid>
              </Grid>
            </>
          )}

          <PageSubTitle>
            Registered members
          </PageSubTitle>
          <Box mb={3}>
            {props.tournament.members.length > 0 ? (
              <TournamentViewUserChip
                members={props.tournament.members}
                onKick={props.tournament.host === user.username ? props.kickTournament : null}
                size="medium"
              />
            ) : (
              <Typography variant="body1">
                No users have currently registered for this event. Who's gonna be the first lucky contestant?
              </Typography>
            )}
          </Box>

          {/* Teams */}
          <PageSubTitle>
            Teams
          </PageSubTitle>
          <Box mb={3}>
            {Object.entries(props.tournament.teams).length > 0 ? (
              <TournamentViewTeamCardList
                teams={props.tournament.teams}
                canUserJoin={props.tournament.userTeam !== null}
                maxTeamMembers={props.tournament.maxTeamMembers}
                hideButton={false}
              />
            ) : (
              <Typography variant="body1">
                Well, since there are no members there are no teams. 😞
              </Typography>
            )}
          </Box>

          {/* Settings */}
          {props.tournament.host === user.username && (
            <>
              <PageSubTitle>Event Settings</PageSubTitle>
    
              <Box mt={2} mb={3} display="flex" gap={1}>
                <Button variant="contained" onClick={handleOpen}>
                  Update the Tournament
                </Button>
                {props.tournament.status === 0 &&
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => alert("Assigning brackets done on API, PHASE 2 PHASE 2 PHASE 2")}
                  >
                    Start Tournament
                  </Button>
                }
                {props.tournament.status === 1 &&
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleEndTournamentClk}
                  >
                    End Tournament Early
                  </Button>
                }
              </Box>
            </>
          )}
        </>
      )}

      {props.tournament.host === user.username && (
        <TournamentUpdateModal
          open={open}
          handleClose={handleClose}
          public={props.tournament.public}
          id={props.tournament.id}
        />
      )}
    </Container>
  );
}
