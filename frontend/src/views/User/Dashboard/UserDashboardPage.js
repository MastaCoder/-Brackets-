import {Box, Button, Typography} from "@mui/material";
import TournamentCard from "../../../components/Tournaments/TournamentCard/TournamentCard";
import {useHistory} from "react-router";
import PageTitle from "../../../components/Layout/PageTitle";

export default function UserDashboardPage() {
  const history = useHistory();

  return (
    <>
      <PageTitle>
        User Dashboard
      </PageTitle>

      <Typography variant="h5" component="h2">
        Current tournaments (attending)
      </Typography>
      <Box mt={1} display="flex" flexDirection="row" gap={1}>
        <TournamentCard
          title="CSSU Games Night - League of Legends"
          description="Join us for the CSSU game night, featuring League of Legends! We run this event weekly with registration done at the front office room BA1010"
          public={true}
          members={72}
          teams={12}
          status={0}
        />
      </Box>
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
      <Box mt={1} display="flex" flexDirection="row" gap={2.5}>
        <Typography variant="body1">
          You're not hosting any tournaments right now.
        </Typography>
      </Box>

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
    </>
  );
}
