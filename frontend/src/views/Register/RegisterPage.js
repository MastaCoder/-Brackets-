import { Container, Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react"
import PageTitle from "../../components/Layout/PageTitle";

export default function RegisterPage(props) {
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();

    if (password === passwordConfirm) {
      event.currentTarget.submit();
    } else {
      setPasswordMismatch(true);
    }
  }

  return (
    <Container maxWidth="sm">
      <PageTitle>
        Register for an account
      </PageTitle>

      { passwordMismatch && (
        <Alert severity="error">Passwords do not match.</Alert>
      )}
      <Box component="form" onSubmit={handleRegistration}>
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
        <Box textAlign="center" mt={1}>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  )
}