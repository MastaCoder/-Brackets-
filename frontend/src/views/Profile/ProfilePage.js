import {Container, Box, Button, TextField, Alert} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import PageTitle from "../../components/Layout/PageTitle";

export default function ProfilePage() {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    (async function() {
      const res = await axios.post("/api/auth/getloggedinuserdetails", {});
      setNewUsername(res.data.username);
      setNewEmail(res.data.email);
    })();
  }, []);

  async function handleChangeInfo(event) {
    event.preventDefault();

    if (newPassword === passwordConfirm) {
      setPasswordMismatch(false);

      try {
        setUsernameTaken(false);
        await axios.post("/api/auth/update", {
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword
        });
      } catch {
        setUsernameTaken(true);
      }
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
        { usernameTaken && (
          <Alert severity="error">This username or email has already been taken.</Alert>
        )}
        <Box component="form" onSubmit={handleChangeInfo}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
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