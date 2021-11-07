import { Box, Button, Container, Typography } from "@mui/material";
import { useHistory } from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {useContext, useEffect, useState} from "react";
import DataContext from "../../../contexts/dataContext";

export default function UserDashboardPage() {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const history = useHistory();
  const [data, setData] = useContext(DataContext);

  // This will be an API call later (attending events)
  useEffect(() => {
    let attending = [];
    data.tournaments.forEach((tournament) => {
      if (tournament.members.includes('user'))
        attending.push(tournament);
    });
    setAttendingEvents(attending);
  }, [data]);

  return (
    <Container maxWidth="xl">
      <PageTitle>User Dashboard</PageTitle>

      {/* Attending */}
      <PageSubTitle>Current tournaments (attending)</PageSubTitle>
      <Box>
        <TournamentCardList cards={attendingEvents} />
      </Box>
      <Box mt={2} mb={4} display="flex" gap={1}>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/user/join");
          }}
        >
          Join a tournament
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push("/user/history");
          }}
        >
          View attended history
        </Button>
      </Box>

      {/* Hosting */}
      <PageSubTitle>Current tournaments (hosting)</PageSubTitle>
      {/*{data.hostingTournaments.length ? (*/}
      {/*  <TournamentCardList cards={data.hostingTournaments} />*/}
      {/*) : (*/}
      {/*  "You're not hosting any tournaments right now."*/}
      {/*)}*/}
      <Box mt={2} mb={4} display="flex" gap={1}>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/org/create");
          }}
        >
          Create a tournament
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push("/org/history");
          }}
        >
          View created history
        </Button>
      </Box>
    </Container>
  );
}
