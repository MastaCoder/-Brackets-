import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import {Box, Container} from "@mui/material";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import {useEffect, useState} from "react";
import axios from "axios";

export default function UserJoinPage() {
  const [publicEvents, setPublicEvents] = useState(null);

  // This will be an API call later (attending events)
  useEffect(() => {
    axios
      .get('/api/tournaments/list/public/0')
      .then((res) => setPublicEvents(res.data.tournaments));
  }, []);

  return (
    <Container maxWidth="xl">
      <PageTitle>
        Find an event
      </PageTitle>

      {/* All current events */}
      <Box>
        <PageSubTitle>
          Public events
        </PageSubTitle>
        <TournamentCardList
          cards={publicEvents}
        />
      </Box>
    </Container>
  );
}