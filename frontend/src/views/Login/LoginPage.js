import { Container, Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../../hooks/Auth";
import { useHistory } from "react-router";
import { useState } from "react";

const playerEmail = "user@user.com";
const playerPassword = "user";
const adminEmail = "admin@admin.com";
const adminPassword = "admin";

export default function LoginPage(props) {
  const auth = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    if (email === playerEmail && password === playerPassword) {
      setInvalidPassword(false);
      auth.signin(true, () => {});
      history.push("/profile");
    } else if (email === adminEmail && password === adminPassword) {
      setInvalidPassword(false);
      auth.signin(true, () => {});
    } else {
      setInvalidPassword(true);
    }
  };

  return (
    <>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" component="h1">
          Log in to your account
        </Typography>
      </Box>

      <Container maxWidth="sm">
        { invalidPassword && (
          <Alert severity="error">Invalid credentials.</Alert>
        )}
        <Box component="form" onSubmit={HandleLogin}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            label="Email Address"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
          />
          <Box textAlign="center" mt={1}>
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>

  )
};