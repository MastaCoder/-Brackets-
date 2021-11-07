import PlayerCard from '../PlayerCard/PlayerCard';
import { Grid } from '@mui/material';
import { uid } from 'react-uid';

const PlayerList = ({ players, handlePlayerUpdate }) => {
	return (
		<Grid container spacing={2}>
			{players.map((player) => {
				return (
					<Grid sm={6} md={4} item>
						<PlayerCard
							player={player}
							key={uid(player)}
							handlePlayerUpdate={handlePlayerUpdate}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default PlayerList;
