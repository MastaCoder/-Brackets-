import { Container } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import DataContext from '../../../contexts/dataContext';
import PageTitle from '../../../components/Layout/PageTitle';
import PlayerList from '../../../components/Player/PlayerList/PlayerList';



const AdminViewUsers = ({ displayUserType }) => {

	const [data, setData] = useContext(DataContext);

	const [players, setPlayers] = useState(data.users);
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
		setData({...data, users: players})
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
