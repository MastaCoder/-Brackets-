import {
	Alert,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
} from '@mui/material';
import PageTitle from '../../../components/Layout/PageTitle';
import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from "axios";

export default function OrganizerCreatePage() {
	const history = useHistory();
	const [message, setMessage] = useState(null);

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		maxMembers: 0,
		maxTeamSize: 0,
		public: true,
	});

	const onPublicChange = (v) => {
		setFormData({ ...formData, public: v });
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);

		try {
			await axios.post('/api/tournaments', {
				name: formData.name,
				description: formData.description,
				public: formData.public,
				maxMembers: formData.maxMembers,
				maxTeamMembers: formData.maxTeamSize
			});

			history.push('/user');
		} catch (err) {
			setMessage(err.response.data.msg);
		}
	};

	return (
		<Container maxWidth="md">
			<PageTitle>Create an event</PageTitle>

			{message !== null && <Alert severity="error">{message}</Alert>}

			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Name"
					name="name"
					onChange={(e) => onChange(e)}
					inputProps={{ maxLength: 50 }}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					multiline
					rows={3}
					label="Description"
					name="description"
					onChange={(e) => onChange(e)}
					inputProps={{ maxLength: 500 }}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					type="number"
					label="Maximum members"
					name="maxMembers"
					onChange={(e) => onChange(e)}
					inputProps={{ min: 2, max: 100 }}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					type="number"
					label="Team Size"
					name="maxTeamSize"
					onChange={(e) => onChange(e)}
					inputProps={{ min: 1, max: formData.maxMembers }}
				/>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label="Public"
					onChange={(e) => onPublicChange(e.target.checked)}
				/>
				<Box textAlign="center" mt={1}>
					<Button type="submit" variant="contained" size="large">
						Create
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
