import {Box, Button, Container, Grid, Typography} from "@mui/material";
import TournamentCard from "../../../components/TournamentList/TournamentCard/TournamentCard";
import {useHistory} from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";
import PageSubTitle from "../../../components/Layout/PageSubTitle";
import TournamentCardList from "../../../components/TournamentList/TournamentCardList";

export default function UserDashboardPage() {
  const history = useHistory();

  return (
    <Container maxWidth="xl">
      <PageTitle>
        User Dashboard
      </PageTitle>

      {/* Attending */}
      <PageSubTitle>
        Current tournaments (attending)
      </PageSubTitle>
      <TournamentCardList
        cards={[
          {
            id: 1,
            name: "CSSU Games Night - League of Legends",
            description: "Join us for the CSSU game night, featuring League of Legends! We run this event weekly with" +
              "registration done at the front office room BA1010",
            public: true,
            members: 72,
            teams: 12,
            status: 1
          }
        ]}
      />
      <Box mt={2} mb={4} display="flex" gap={1}>
        <Button
          variant="contained"
          onClick={() => { history.push("/user/join") }}
        >
          Join a tournament
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { history.push("/user/history") }}
        >
          View attended history
        </Button>
      </Box>

      {/* Hosting */}
      <PageSubTitle>
        Current tournaments (hosting)
      </PageSubTitle>
      <Typography variant="body1">
        You're not hosting any tournaments right now.
      </Typography>
      <Box mt={2} mb={4} display="flex" gap={1}>
        <Button
          variant="contained"
          onClick={() => { history.push("/org/create") }}
        >
          Create a tournament
        </Button>
        <Button variant="contained" color="secondary">
          View created history
        </Button>
      </Box>
    </Container>
  );
}
