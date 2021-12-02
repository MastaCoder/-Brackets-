import { Container, Box, Button, TextField, Alert } from '@mui/material';
import { useAuth } from '../../hooks/Auth';
import { useHistory } from 'react-router';
import { useState } from 'react';
import PageTitle from '../../components/Layout/PageTitle';
import axios from 'axios';

export default function LoginPage() {
	const auth = useAuth();
	const history = useHistory();

	const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const HandleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = (
				await axios.post('/api/auth/login', {
					username: username,
					password: password,
				})
			).data;

			auth.signin(user._id, () => {
				user.type === 'user'
					? history.push('/user')
					: history.push('/dashboard');
			});

		} catch(err) {
			setShowMessage(true);
			setMessage(err.response.data.msg);
		}
	};

	return (
		<Container maxWidth="sm">
			<PageTitle>Log in to your account</PageTitle>

			{showMessage && <Alert severity="error">{message}</Alert>}

			<Box component="form" onSubmit={HandleLogin}>
				<TextField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
					required
					fullWidth
					label="Username"
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
					<Button type="submit" variant="contained" size="large">
						Login
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
