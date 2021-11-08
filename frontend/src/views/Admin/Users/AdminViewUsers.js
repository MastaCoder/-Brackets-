import { Container } from '@mui/material';
import { useEffect, useContext } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import PlayerList from '../../../components/Player/PlayerList/PlayerList';
import DataContext from '../../../contexts/dataContext';

const AdminViewUsers = ({ displayUserType }) => {
	const [data, setData] = useContext(DataContext);
	// We will make an API call to get the users
	// Currently doing it manually
	useEffect(() => {
		if (displayUserType === 'banned') {
			const bannedPlayers = data.players.filter((player) => player.isBanned);
			setData({ ...data, players: bannedPlayers });
		}
	}, [displayUserType, data, setData]); // might wanna get rid of this later

	const handlePlayerUpdate = (id) => {
		const updatedPlayers = data.players.map((player) => {
			if (player.id === id) {
				return { ...player, isBanned: !player.isBanned };
			}
			return player;
		});
		setData({ ...data, players: updatedPlayers });
	};

	return (
		<Container component="main">
			<PageTitle variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
				Manage Users
			</PageTitle>
			<PlayerList players={data.players} handlePlayerUpdate={handlePlayerUpdate} />
		</Container>
	);
};

export default AdminViewUsers;
