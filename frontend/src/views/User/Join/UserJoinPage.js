import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/TournamentList/TournamentCardList";
import {Box, Container} from "@mui/material";
import PageSubTitle from "../../../components/Layout/PageSubTitle";

export default function UserJoinPage() {
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
          cards={[]}
        />
      </Box>
    </Container>
  );
}