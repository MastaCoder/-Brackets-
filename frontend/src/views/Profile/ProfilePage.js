import {Container, Grid, Box, Button, TextField, Typography, Alert, Divider} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"
import PageTitle from "../../components/Layout/PageTitle";

export default function ProfilePage(props) {
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [passwordConfirm, setPasswordConfirm] = useState(props.password);

  function handleChangeInfo(event) {
    event.preventDefault();
    if (password === passwordConfirm) {
      event.currentTarget.submit();
    } else {
      setPasswordMismatch(true);
    }
  }

  return (
    <>
      <PageTitle>
        Edit your profile
      </PageTitle>

      <Container maxWidth="sm">
        { passwordMismatch && (
          <Alert severity="error">Passwords do not match.</Alert>
        )}
        <Box component="form" onSubmit={handleChangeInfo}>
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <Box my={2}>
            <Divider />
          </Box>

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Box textAlign="center" mt={1}>
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}