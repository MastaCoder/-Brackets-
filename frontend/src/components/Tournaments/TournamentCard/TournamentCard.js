import {Box, Chip, Divider, Paper, Typography, Button} from "@mui/material";
import {useHistory} from "react-router";

export default function TournamentCard(props) {
  const history = useHistory();

  const statusChip = (status) => {
    switch (status) {
      case 0: // open
        return (<Chip color="info" label="Open" />);
      case 1: // on-going
        return (<Chip color="warning" label="On-going" />);
      case 2:
        return (<Chip color="danger" label="Ended" />);
      default:
        return (<Chip color="default" label="Unknown" />);
    }
  }

  return (
    <Box maxWidth={425}>
      <Paper elevation={3}>
        <Box p={2} pt={1.25}>
          <Box>
            <Typography variant="h6" component="h3">
              {props.title}
            </Typography>
            <Typography variant="body1">
              {props.description}
            </Typography>
          </Box>
          <Box my={1} mb={2}>
            <Divider />
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            {statusChip(props.status)}
            {props.public ? (
              <Chip color="success" label="Public" />
            ): (
              <Chip color="default" label="Private" />
            )}
            <Chip
              color="secondary"
              label={`${props.members} Member${props.members === 1 ? '' : 's'}`}
            />
            <Chip
              color="primary"
              label={`${props.teams} Team${props.teams === 1 ? '' : 's'}`}
            />
          </Box>
          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => { history.push("/event/1") }}
            >
              View Event Details
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
