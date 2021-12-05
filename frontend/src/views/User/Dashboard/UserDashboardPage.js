import { Box, Button, Container } from "@mui/material";
import { useHistory } from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {useContext, useEffect, useState} from "react";
import DataContext from "../../../contexts/dataContext";
import axios from "axios";

export default function UserDashboardPage() {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [hostingEvents, setHostingEvents] = useState([]);

  const history = useHistory();
  const [data] = useContext(DataContext);

  useEffect(() => {
    axios
      .get('/api/tournaments/list/attending/0')
      .then((res) => console.log("fu", res.data));
  }, []);

  // This will be an API call later
  useEffect(() => {
    let attending = [];
    data.tournaments.forEach((tournament) => {
      if (tournament.members.includes('user') && tournament.status !== 2)
        attending.push(tournament);
    });
    setAttendingEvents(attending);

    let hosting = [];
    data.tournaments.forEach((tournament) => {
      if (tournament.host === 'user' && tournament.status !== 2)
        hosting.push(tournament);
    });
    setHostingEvents(hosting);
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
      <TournamentCardList cards={hostingEvents} />
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
