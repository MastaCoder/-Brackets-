import {Box, Container, Typography} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {useContext, useEffect, useState} from "react";
import DataContext from "../../../contexts/dataContext";

export default function UserHistoryPage() {
  const [eventHistory, setEventHistory] = useState([]);
  const [data] = useContext(DataContext);

  // This will be an API call later (attending events)
  useEffect(() => {
    let events = [];
    data.tournaments.forEach((tournament) => {
      if (tournament.members.includes('user') && tournament.status === 2)
        events.push(tournament);
    });
    setEventHistory(events);
  }, [data]);

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