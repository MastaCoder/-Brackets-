import { useState } from "react";
import TournamentCardList from "../../../components/Tournaments/TournamentList/TournamentCardList";
import TournamentList from "../../../components/Tournaments/TournamentList/TournamentList";
import Styles from "./UserDashboard.module.css";
import {Box, Button, Chip, Divider, Grid, Paper, Typography} from "@mui/material";

export default function UserDashboard() {
  const [tournaments, setTournaments] = useState([
    {
      tournamentTitle: "Tournament 1",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 2",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 3",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 4",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
  ]);

  return (
    <Box mx={4}>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" component="h1">
          User Dashboard
        </Typography>
      </Box>

      <Typography variant="h5" component="h2">
        Current tournaments
      </Typography>
      <Box mt={1} display="flex" flexDirection="row" gap={1}>
        <Box maxWidth={425}>
          <Paper elevation={3}>
            <Box p={2} pt={1.25}>
              <Box>
                <Typography variant="h6" component="h3">
                  CSSU Games Night - League of Legends
                </Typography>
                <Typography variant="body1">
                  Join us for the CSSU game night, featuring League of Legends! We run this event weekly with registration done at the front office room BA1010
                </Typography>
              </Box>
              <Box my={1} mb={2}>
                <Divider />
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <Chip color="default" label="Private" />
                <Chip color="secondary" label="72 Members" />
                <Chip color="primary" label="12 Teams" />
                <Chip color="warning" label="On-going" />
              </Box>
              <Box textAlign="center" mt={2}>
                <Button variant="outlined">
                  View Event Details
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <Button variant="contained">
          Create a new tournament
        </Button>
      </Box>
      THIS PAGE IS WORK IN PROGRESS WORK ON SOMETHING ELSE :) 

      <Typography variant="h5" component="h2">
        Past Tournaments
      </Typography>

      {/*<div className={Styles.tournamentListsContainer}>*/}
      {/*  <TournamentCardList header="Current Tournaments" tournaments={tournaments}/>*/}
      {/*  <TournamentList header="Past Tournaments" tournaments={tournaments} />*/}
      {/*</div>*/}
    </Box>
  );
}
