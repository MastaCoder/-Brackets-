import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {Box, Container} from "@mui/material";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import {useContext, useEffect, useState} from "react";
import DataContext from "../../../contexts/dataContext";

export default function UserJoinPage() {
  const [publicEvents, setPublicEvents] = useState([]);
  const [data] = useContext(DataContext);

  // This will be an API call later (attending events)
  useEffect(() => {
    let events = [];
    data.tournaments.forEach((tournament) => {
      if (!tournament.members.includes('user') && tournament.status === 0)
        events.push(tournament);
    });
    setPublicEvents(events);
  }, [data]);

  return (
    <Container maxWidth="xl">
      <PageTitle>
        Find an event
      </PageTitle>

      {/* All current events */}
      <Box>
        <PageSubTitle>
          Current events
        </PageSubTitle>
        <TournamentCardList
          cards={publicEvents}
        />
      </Box>
    </Container>
  );
}