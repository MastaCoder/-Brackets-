import { Container, Box, Button, TextField, Alert } from '@mui/material';
import { useAuth } from '../../hooks/Auth';
import { useHistory } from 'react-router';
import { useState } from 'react';
import PageTitle from '../../components/Layout/PageTitle';

export default function LoginPage(props) {
	const auth = useAuth();
	const history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [invalidCreds, setInvalidCreds] = useState(false);

	const HandleLogin = (event) => {
		event.preventDefault();

		if (username === 'user' && password === 'user') {
			setInvalidCreds(false);
			auth.signin({ type: 'user', id: 10 }, () => {
				history.push('/user');
			});
		} else if (username === 'admin' && password === 'admin') {
			setInvalidCreds(false);
			auth.signin({ type: 'admin', id: 11 }, () => {
				history.push('/dashboard');
			});
		} else {
			setInvalidCreds(true);
		}
	};

	return (
		<Container maxWidth="sm">
			<PageTitle>Log in to your account</PageTitle>

			{invalidCreds && <Alert severity="error">Invalid credentials.</Alert>}
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
