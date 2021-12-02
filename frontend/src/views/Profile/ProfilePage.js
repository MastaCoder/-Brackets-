import {Container, Box, Button, TextField, Alert} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import PageTitle from "../../components/Layout/PageTitle";

export default function ProfilePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("");

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
    setShowMessage(true);
    if (newPassword !== passwordConfirm) {
      setMessageSeverity("error");
      setMessage("Passwords do not match.");
    } 
    else {
      try {
        const res = await axios.post("/api/auth/update", {
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword
        });

        setMessageSeverity("success");
        setMessage(res.data.msg);
      } catch(err) {
        setMessageSeverity("error");
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <>
      <PageTitle>
        Edit your profile
      </PageTitle>

      <Container maxWidth="sm">

        {showMessage && (<Alert severity={messageSeverity}>{message}</Alert>)}

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