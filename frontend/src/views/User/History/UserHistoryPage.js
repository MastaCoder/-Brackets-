import TournamentCard from "../../../components/TournamentList/TournamentCard/TournamentCard";
import {Box, Container, Grid, Typography} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/TournamentList/TournamentCardList";

export default function UserHistoryPage() {
  return (
    <Container maxWidth="xl">
      <PageTitle>
        Your attended history
      </PageTitle>

      <Typography variant="h5" component="h2">
        Events you've attended
      </Typography>
      <TournamentCardList
        cards={[]}
      />

      <Box mt={1}>
        <Typography variant="caption" color="grey">
          Note: only your last 50 events are shown
        </Typography>
      </Box>
    </Container>
  );
}