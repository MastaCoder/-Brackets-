import {Alert, Box, Button, Container, Grid, Popover, Snackbar, TextField, Typography} from "@mui/material";
import PageTitle from "../../Layout/PageTitle";
import TournamentChips from "../TournamentChips/TournamentChips";
import PageSubTitle from "../../Layout/PageSubTitle";
import TournamentViewUserChip from "./TournamentViewUserChip/TournamentViewUserChip";
import TournamentViewTeamCardList from "./TournamentViewTeamCardList/TournamentViewTeamCardList";
import TournamentViewTeamCard from "./TournamentViewTeamCardList/TournamentViewTeamCard/TournamentViewTeamCard";
import TournamentUpdateModal from "./TournamentUpdateModal/TournamentUpdateModal";
import TournamentViewBrackets from "./TournamentViewBrackets/TournamentViewBrackets";
import {useState} from "react";
import {useAuth} from "../../../hooks/Auth";

export default function TournamentView(props) {
  const { user } = useAuth();

  const [tournamentView, setTournamentView] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [infoUpdate, setInfoUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfoUpdate(true);
  }

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
                hideButton={props.tournament.userTeam === null}
                joinTeam={props.joinTeam}
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
              <Box maxWidth={550} mt={2}>
                <TextField
                  label="Event invite link"
                  variant="outlined"
                  defaultValue={window.location.href}
                  fullWidth
                  onClick={(e) => e.target.select()}
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <Box mt={2} display="flex" gap={1}>
                <Button variant="contained" onClick={handleOpen}>
                  Update the Tournament
                </Button>
                {[0, 1].includes(props.tournament.status) &&
                  <Button
                    variant="contained"
                    color={props.tournament.status === 0 ? 'success' : 'warning'}
                    onClick={() => props.nextStage()}
                    disabled={Object.keys(props.tournament.teams).length < 2}
                  >
                    {props.tournament.status === 0 ? 'Start Tournament' : 'End Tournament Early'}
                  </Button>
                }
              </Box>
              <Box mt={2} mb={1} display="flex" gap={1}>
                {props.tournament.status === 0 &&
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => props.regenerateLink()}
                  >
                    Regenerate event link
                  </Button>
                }
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  Delete event
                </Button>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Box p={2}>
                    <Typography>Are you <strong>sure</strong> you want to do this?</Typography>
                    <Typography fontSize={12}>You cannot undo this action!</Typography>
                    <Box textAlign="center" mt={1}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => props.deleteTournament()}
                      >
                        Yes I'm sure
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Typography variant="caption" color="grey">
                Note: Minimum of two teams required to start an event
              </Typography>
            </>
          )}
        </>
      )}

      {props.tournament.host === user.username && (
        <>
          <Snackbar
            open={infoUpdate}
            autoHideDuration={4000}
            onClose={() => setInfoUpdate(false)}
            anchorOrigin={{ horizontal: "right", vertical: 'bottom'}}
            message="Your info has been updated successfully!"
          >
          </Snackbar>
          <TournamentUpdateModal
            open={open}
            handleClose={handleClose}
            public={props.tournament.public}
            description={props.tournament.description}
            id={props.tournament.id}
            updateTournament={props.updateTournament}
          />
        </>
      )}
    </Container>
  );
}
