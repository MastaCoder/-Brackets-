import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import PlayerList from '../../../components/Player/PlayerList/PlayerList';
import axios from 'axios';

const AdminViewUsers = () => {
	const [platformUsers, setPlatformUsers] = useState([]);

	// We will make an API call to get the users
	const handlePlayerUpdate = async (username) => {
		const userToModify = platformUsers.filter(
			(user) => user.username === username
		)[0];

		try {
			// First modify the user's platform access
			await axios.post('/api/admin/modifyuseraccess', {
				username: userToModify.username,
				platformAccess: !userToModify.platformAccess,
			});
			// Then update the current state
			await axios
				.get('/api/admin/platformusers')
				.then((res) => setPlatformUsers(res.data));
		} catch (err) {
			console.log(err);
		}
	};

	// Issue the API call to get all platform users
	useEffect(() => {
		axios
			.get('/api/admin/platformusers')
			.then((res) => setPlatformUsers(res.data));
	}, []);

	return (
		<Container component="main">
			<PageTitle variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
				Manage Users
			</PageTitle>
			<PlayerList
				players={platformUsers}
				handlePlayerUpdate={handlePlayerUpdate}
			/>
		</Container>
	);
};

export default AdminViewUsers;
