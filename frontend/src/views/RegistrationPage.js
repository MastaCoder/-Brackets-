import { Container, Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react"

function RegistrationAlert(props) {

}

export default function RegistrationPage(props) {
  const [passwordMismatch, setPasswordMistmatch] = useState(false);

  function handleRegistration(event) {
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegistration}>
          { passwordMismatch && (
            <Alert severity="error">Passwords do not match.</Alert>  
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username-input"
            label="Username"
            name="username-input"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email-input"
            label="Email"
            type="email"
            name="email-input"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password-input"
            label="Password"
            type="password"
            id="password-input"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password-confirm-input"
            label="Confirm Password"
            type="password"
            id="password-confirm-input"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, fontWeight: "bold" }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  )
}