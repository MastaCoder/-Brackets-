import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
} from '@mui/material';
import PageTitle from '../../../components/Layout/PageTitle';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import DataContext from '../../../contexts/dataContext';
import { useAuth } from '../../../hooks/Auth';

export default function OrganizerCreatePage() {
	const history = useHistory();
	const { user } = useAuth();
	const [data, setData] = useContext(DataContext);

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		maxMembers: 0,
		maxTeamSize: 0,
		public: true,
		host: '',
	});

	const onPublicChange = (v) => {
		setFormData({ ...formData, public: v });
	};

	const onChange = (e) => {
		// console.log(formData);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const tournaments = [...data.tournaments];

		tournaments.push({
			id: tournaments.length + 1,
			status: 0,
			name: formData.name,
			description: formData.description,
			maxMembers: parseInt(formData.maxMembers),
			maxTeams: parseInt(formData.maxTeamSize),
			public: formData.public,
			members: [],
			teams: {},
			host: 'user',
			userTeam: null
		});
		console.log(tournaments);
		setData({ ...data, tournaments: tournaments });
		console.log(data);
		history.push('/user');
	};

	return (
		<Container maxWidth="md">
			<PageTitle>Create an event</PageTitle>

			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Name"
					name="name"
					onChange={(e) => onChange(e)}
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
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					type="number"
					label="Maximum members"
					name="maxMembers"
					onChange={(e) => onChange(e)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					type="number"
					label="Team Size"
					name="maxTeamSize"
					onChange={(e) => onChange(e)}
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
