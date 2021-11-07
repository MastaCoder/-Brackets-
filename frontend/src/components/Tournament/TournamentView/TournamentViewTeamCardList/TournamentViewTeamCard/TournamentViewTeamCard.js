import {Box, Button, Divider, Paper, TextField, Typography} from "@mui/material";
import TournamentViewUserChip from "../../TournamentViewUserChip/TournamentViewUserChip";
import {useState} from "react";

export default function TournamentViewTeamCard(props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.teamName);

  const updateName = (e) => {
    props.onNameUpdate(props.teamName, newName);
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

        {/* Neat little trick, if the user can edit then they can't join */}
        {(props.onNameUpdate === null && props.canUserJoin) && (
          <Box textAlign="center" mt={1}>
            <Button
              variant="outlined"
              size="small"
              color="success"
              disabled={props.team.length >= props.maxTeamMembers}
              onClick={() => alert("To be implemented in phase 2!")}
            >
              Join team
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}