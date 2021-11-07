import {Box, Container, Grid, Typography} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import TournamentCardList from "../../../components/Tournament/TournamentList/TournamentCardList";
import PaginatedTable from "../../../components/Table/PaginatedTable";

export default function OrganizerHistoryPage() {

  return (
    <Container maxWidth="xl">
      <PageTitle>
        Your created history
      </PageTitle>

      <Typography variant="h5" component="h2">
        Events you've hosted
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