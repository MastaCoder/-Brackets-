import {Box, Chip} from "@mui/material";

export default function TournamentChips(props) {
  const statusChip = (status) => {
    switch (status) {
      case 0: // open
        return (<Chip color="info" label="Open" size={props.size}  />);
      case 1: // on-going
        return (<Chip color="warning" label="On-going" size={props.size}  />);
      case 2:
        return (<Chip color="error" label="Ended" size={props.size} />);
      default:
        return (<Chip color="default" label="Unknown" size={props.size} />);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={1}
      justifyContent={props.justify ?? 'left'}
    >
      {statusChip(props.status)}
      {props.public ? (
        <Chip size={props.size} color="success" label="Public" />
      ): (
        <Chip size={props.size} color="default" label="Private" />
      )}
      <Chip
        color="secondary"
        label={`${props.maxMembers} Member${props.maxMembers === 1 ? '' : 's'}`}
        size={props.size}
      />
      <Chip
        color="primary"
        label={`${props.maxTeams} Team${props.maxTeams === 1 ? '' : 's'}`}
        size={props.size}
      />
    </Box>
  );
}