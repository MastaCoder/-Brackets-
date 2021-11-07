import {Box, Chip} from "@mui/material";

export default function TournamentViewUserChip(props) {
  return (
    <Box display="flex" gap={1}>
      {props.members.map((userName) => (
        props.onKick === null ? (
          <Chip color="primary" label={userName} />
        ) : (
          <Chip color="primary" label={userName} onDelete={() => props.onKick(userName)} />
        )
      ))}
    </Box>
  );
}