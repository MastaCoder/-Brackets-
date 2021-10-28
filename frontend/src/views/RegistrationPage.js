import { Container, Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react"

export default function RegistrationPage(props) {
  const [passwordMismatch, setPasswordMistmatch] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleRegistration(event) {
    event.preventDefault();

    if (password === passwordConfirm) {
      event.currentTarget.submit();
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
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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