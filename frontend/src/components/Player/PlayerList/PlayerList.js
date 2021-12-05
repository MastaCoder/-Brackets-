import PlayerCard from '../PlayerCard/PlayerCard';
import { Grid } from '@mui/material';
import { uid } from 'react-uid';
import { useAuth } from '../../../hooks/Auth';

const PlayerList = ({ players, handlePlayerUpdate }) => {
	const auth = useAuth();
	// Filter out the current user
	players = players.filter((player) => player._id !== auth.user._id);
	return (
		<Grid container spacing={2}>
			{players.map((player) => (
				<Grid key={uid(player)} sm={6} md={4} item>
					<PlayerCard player={player} handlePlayerUpdate={handlePlayerUpdate} />
				</Grid>
			))}
		</Grid>
	);
};

export default PlayerList;
