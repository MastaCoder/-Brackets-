import { Container, Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/Auth";
import { useHistory } from "react-router";

const playerEmail = "user@user.com";
const playerPassword = "user";
const adminEmail = "admin@admin.com";
const adminPassword = "admin";

const LoginPage = (props) => {
  const auth = useAuth();
  const history = useHistory();

  const HandleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email-input');
    const password = data.get('password-input')
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
            margin="normal"
            required
            fullWidth
            id="email-input"
            label="Email Address"
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

export default LoginPage;