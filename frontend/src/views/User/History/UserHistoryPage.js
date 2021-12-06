import {Box, Container, Typography} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {useEffect, useState} from "react";
import axios from "axios";

export default function UserHistoryPage() {
  const [eventHistory, setEventHistory] = useState(null);

  useEffect(() => {
    axios
      .get('/api/tournaments/list/attending/2')
      .then((res) => setEventHistory(res.data.tournaments));
  }, []);

  return (
    <Container maxWidth="xl">
      <PageTitle>
        Your attended history
      </PageTitle>

      <Typography variant="h5" component="h2">
        Events you've attended
      </Typography>
      <TournamentCardList
        cards={eventHistory}
      />

      <Box mt={1}>
        <Typography variant="caption" color="grey">
          Note: only your last 50 events are shown
        </Typography>
      </Box>
    </Container>
  );
}