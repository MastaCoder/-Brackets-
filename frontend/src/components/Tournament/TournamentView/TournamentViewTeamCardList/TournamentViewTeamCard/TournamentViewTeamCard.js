import {Box, Button, Divider, Paper, TextField, Typography} from "@mui/material";
import TournamentViewUserChip from "../../TournamentViewUserChip/TournamentViewUserChip";
import {useState} from "react";
import {useAuth} from "../../../../../hooks/Auth";

export default function TournamentViewTeamCard(props) {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.teamName);

  const updateName = () => {
    props.teamNameChange(newName);
    setEditing(false);
  }

  return (
    <Paper elevation={3}>
      <Box p={2} pt={1.25}>
        {(editing && props.onNameUpdate !== null) ? (
          <Box component="form" onSubmit={updateName}>
            <TextField
              id="standard-basic"
              variant="standard"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Box>
        ) : (
          <Box onClick={() => setEditing(true)}>
            <Typography variant="h6" component="h3">
              {props.teamName}
            </Typography>
          </Box>
        )}

        <Box my={1} mb={2}>
          <Divider />
        </Box>
        <TournamentViewUserChip
          members={props.team}
          onKick={props.onKick ?? null}
          size="small"
        />

        {!props.hideButton && (
          <Box textAlign="center" mt={1}>
            <Button
              variant="outlined"
              size="small"
              color="success"
              disabled={props.team.length >= props.maxTeamMembers || props.team.includes(user.username)}
              onClick={() => props.joinTeam(props.teamName)}
            >
              Join team ({props.team.length}/{props.maxTeamMembers})
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}