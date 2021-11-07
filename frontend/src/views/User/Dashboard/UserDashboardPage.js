import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import TournamentCardList from "../../../components/TournamentList/TournamentCardList";
import { useContext } from "react";
import DataContext from "../../../contexts/dataContext";

export default function UserDashboardPage() {
  const history = useHistory();

  const [data, setData] = useContext(DataContext);

  return (
    <Container maxWidth="xl">
      <PageTitle>User Dashboard</PageTitle>

      {/* Attending */}
      <PageSubTitle>Current tournaments (attending)</PageSubTitle>
      <TournamentCardList cards={data.attendingTournaments} />
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
      <Typography variant="body1">
        {data.hostingTournaments.length ? (
          <TournamentCardList cards={data.hostingTournaments} />
        ) : (
          "You're not hosting any tournaments right now."
        )}
      </Typography>
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
