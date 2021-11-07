import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import PlayerList from '../../../components/Player/PlayerList/PlayerList';

const allPlayers = [
	{
		type: 'user',
		id: 1,
		name: 'im_too_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 2,
		name: 'im_tooo_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 3,
		name: 'im_tooo_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 4,
		name: 'ayo_pierre',
		email: 'pierre@mail.com',
		isBanned: true,
	},
	{
		type: 'user',
		id: 5,
		name: 'damnBoi1782',
		email: 'dammit@mail.com',
		isBanned: false,
	},
];

const AdminViewUsers = ({ displayUserType }) => {
	const [players, setPlayers] = useState(allPlayers);
	// We will make an API call to get the users
	// Currently doing it manually
	useEffect(() => {
		if (displayUserType === 'banned') {
			const bannedPlayers = players.filter((player) => player.isBanned);
			setPlayers(bannedPlayers);
		}
	}, [displayUserType]);

	const handlePlayerUpdate = (id) => {
		const updatedPlayers = players.map((player) => {
			if (player.id === id) {
				return { ...player, isBanned: !player.isBanned };
			}
			return player;
		});
		setPlayers(updatedPlayers);
	};

	return (
		<Container component="main">
			<PageTitle variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
				Manage Users
			</PageTitle>
			<PlayerList players={players} handlePlayerUpdate={handlePlayerUpdate} />
		</Container>
	);
};

export default AdminViewUsers;
