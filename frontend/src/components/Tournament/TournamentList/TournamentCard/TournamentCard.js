import {Box, Divider, Paper, Typography, Button} from "@mui/material";
import {useHistory} from "react-router";
import styles from "./TournamentCard.module.css";
import TournamentChips from "../../TournamentChips/TournamentChips";

export default function TournamentCard(props) {
  const history = useHistory();

  return (
    <Box>
      <Paper elevation={3}>
        <Box p={2} pt={1.25}>
          <Box>
            <Typography variant="h6" component="h3">
              {props.title}
            </Typography>
            <Typography variant="body1" className={styles.description}>
              {props.description}
            </Typography>
          </Box>
          <Box my={1} mb={2}>
            <Divider />
          </Box>
          <TournamentChips
            public={props.public}
            teamsCount={props.teamsCount}
            status={props.status}
            membersCount={props.membersCount}
            maxMembers={props.maxMembers}
            size="small"
          />
          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => { history.push(`/tournament/${props.id}`) }}
            >
              View Event Details
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
