import { Container, Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react"
import PageTitle from "../../components/Layout/PageTitle";
import axios from "axios"

export default function RegisterPage() {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageSeverity, setMessageSeverity] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegistration = async (event) => {
        event.preventDefault();

        setShowMessage(true);
        if (password !== passwordConfirm) {
            setMessageSeverity("error");
            setMessage("Passwords do not match.")
        } else {
            try {
                const res = await axios.post("/api/auth/register", {
                    username: username,
                    email: email,
                    password: password
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
        <Container maxWidth="sm">
        <PageTitle>
            Register for an account
        </PageTitle>

        {showMessage && (
            <Alert severity={messageSeverity}>{message}</Alert>
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