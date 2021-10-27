import { Container, Grid, Box, Button, TextField, Typography, Alert, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"

export default function ProfilePage(props) {
  const [passwordMismatch, setPasswordMistmatch] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  function handleChangeInfo(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const username = data.get('username-input');
    const email = data.get('email-input');
    const password = data.get('password-input')
    const password_confirm = data.get('password-confirm-input')

    if (password === password_confirm) {
      form.submit();
    } else {
      setPasswordMistmatch(true);
    }
  }

  function handleCancelEdit() {
    // Lock the fields.
    setUpdatingProfile(false);
    // Reset all fields back to their default from the props.
    document.getElementById('username-input').value = props.username;
    document.getElementById('email-input').value = props.email;
    document.getElementById('password-input').value = props.password;
    document.getElementById('password-confirm-input').value = props.password;
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
            id="username-input"
            label="Username"
            name="username-input"
            defaultValue={ props.username }
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            id="email-input"
            label="Email"
            type="email"
            name="email-input"
            defaultValue={ props.email }
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            name="password-input"
            label="Password"
            type="password"
            id="password-input"
            defaultValue={ props.password }
          />
          <TextField
            margin="normal"
            disabled={!updatingProfile}
            required={updatingProfile}
            fullWidth
            name="password-confirm-input"
            label="Confirm Password"
            type="password"
            id="password-confirm-input"
            defaultValue={ props.password }
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