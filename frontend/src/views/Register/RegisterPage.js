import { Container, Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react"
import { useHistory } from "react-router";
import PageTitle from "../../components/Layout/PageTitle";
import axios from "axios"

export default function RegisterPage(props) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const history = useHistory();

    const handleRegistration = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            setError(true);
            setErrorMessage("Passwords do not match.")
        } else {
            try {
                await axios.post("/api/auth/register", {
                    username: username,
                    email: email,
                    password: password
                });
                history.push("/login");
            } 
            catch(err) {
                setError(true);
                setErrorMessage(err.response.data.msg);
            }
        }
    }

    return (
        <Container maxWidth="sm">
        <PageTitle>
            Register for an account
        </PageTitle>

        {error && (
            <Alert severity="error">{errorMessage}</Alert>
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