import {Box, Chip} from "@mui/material";
import {uid} from "react-uid";

export default function TournamentViewUserChip(props) {
  return (
    <Box display="flex" gap={1}>
      {props.members.map((userName) => (
        props.onKick === null ? (
          <Chip color="primary" label={userName} size={props.size} key={uid(userName)} />
        ) : (
          <Chip
            color="primary"
            label={userName}
            size={props.size}
            onDelete={() => props.onKick(userName)}
            key={uid(userName)}
          />
        )
      ))}
    </Box>
  );
}