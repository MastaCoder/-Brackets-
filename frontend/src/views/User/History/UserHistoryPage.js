import TournamentCard from "../../../components/Tournaments/TournamentCard/TournamentCard";
import {Box, Container, Grid, Typography} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";

export default function UserHistoryPage() {
  return (
    <Container maxWidth="xl">
      <PageTitle>
        Your attended history
      </PageTitle>

      <Typography variant="h5" component="h2">
        Events you've attended
      </Typography>
      <Grid container spacing={2} mt={0}>
        {[...Array(5)].map((e, i) => (
          <Grid sm={6} md={4} item>
            <TournamentCard
              title={`Attended event #${i}`}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
              public={i % 2}
              members={i * 4 + 2}
              teams={i + 2}
              status={2}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={1}>
        <Typography variant="caption" color="grey">
          Note: only your last 50 events are shown
        </Typography>
      </Box>
    </Container>
  );
}