import { Container, Box, Button, TextField, Typography } from "@mui/material";

const playerEmail = "user@user.com";
const playerPassword = "user";
const organizerEmail = "organizer@organizer.com";
const organizerPassword = "organizer";
const adminEmail = "admin@admin.com";
const adminPassword = "admin";

const LoginPage = (props) => {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email-input');
    const password = data.get('password-input')
    if (email === playerEmail && password === playerPassword) {
      // redirect to user page
      console.log("Player login has succeeded");
    } else if (email === organizerEmail && password === organizerPassword) {
      // redirect to user page
      console.log("Organizer login has succeeded");
    } else if (email === adminEmail && password === adminPassword) {
      // redirect to user page
      console.log("Admin login has succeeded");
    } else {
      // redirect to login page
      console.log("Login failed");
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
        <Typography component="h1" variant="h4" sx={{ mb: 5 }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
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