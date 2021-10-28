import { Container, Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/Auth";
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

  const HandleLogin = (event) => {
    event.preventDefault();
    if (email === playerEmail && password === playerPassword) {
      auth.signin(true, () => {});
      history.push("/profile");
    } else if (email === adminEmail && password === adminPassword) {
      auth.signin(true, () => {});
    } else {
      // Show error message here
    }
  };

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
          Log In
        </Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  )
};