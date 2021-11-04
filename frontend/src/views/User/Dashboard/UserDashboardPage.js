import {Box, Button, Container, Grid, Typography} from "@mui/material";
import TournamentCard from "../../../components/Tournaments/TournamentCard/TournamentCard";
import {useHistory} from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";
import PageSubTitle from "../../../components/Layout/PageSubTitle";

export default function UserDashboardPage() {
  const history = useHistory();

  return (
    <Container maxWidth="xl">
      <PageTitle>
        User Dashboard
      </PageTitle>

      <PageSubTitle>
        Current tournaments (attending)
      </PageSubTitle>
      <Grid container spacing={2}>
        <Grid sm={6} md={4} item>
          <TournamentCard
            title="CSSU Games Night - League of Legends"
            description="Join us for the CSSU game night, featuring League of Legends! We run this event weekly with
            registration done at the front office room BA1010"
            public={true}
            members={72}
            teams={12}
            status={0}
          />
        </Grid>
      </Grid>
      <Box mt={2} mb={4} display="flex" flexDirection="row" gap={1}>
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

      <Typography variant="h5" component="h2">
        Current tournaments (hosting)
      </Typography>
      <Typography variant="body1">
        You're not hosting any tournaments right now.
      </Typography>

      <Box mt={2} mb={4} display="flex" flexDirection="row" gap={1}>
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
