import { Container, Grid, Box, Button, TextField, Typography, Alert, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"

export default function ProfilePage(props) {
  const [passwordMismatch, setPasswordMistmatch] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [passwordConfirm, setPasswordConfirm] = useState(props.password);

  function handleChangeInfo(event) {
    event.preventDefault();
    if (password === passwordConfirm) {
      event.currentTarget.submit();
    } else {
      setPasswordMistmatch(true);
    }
  }

  function handleCancelEdit() {
    // Lock the fields.
    setUpdatingProfile(false);
    // Reset all fields back to their default from the props.
    setUsername(props.username);
    setEmail(props.email);
    setPassword(props.password);
    setPasswordConfirm(props.password);    
    // Reset password if tripped.
    setPasswordMistmatch(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 5, fontWeight: "bold" }}>
          Your Profile
        </Typography>
        
        <Grid
          container
          sx = {{ mb: 1 }}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          { !updatingProfile && (
            <Button variant="outlined" endIcon={<EditIcon />} size="small" onClick={() => setUpdatingProfile(true)}>
              Edit
            </Button>
          )}
          { updatingProfile && (
            <Button variant="outlined" endIcon={<CloseIcon />} size="small" onClick={handleCancelEdit}>
              Cancel
            </Button>
          )}
        </Grid>

        <Box component="form" onSubmit={handleChangeInfo}>
          { passwordMismatch && (
            <Alert severity="error">Passwords do not match.</Alert>  
          )}
          <TextField
            fullWidth
            disabled={!updatingProfile}
            required={updatingProfile}
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          { updatingProfile && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, fontWeight: "bold" }}
            >
              Update Profile
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}