import { Typography, Box, Avatar, Chip, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	cardStyles: {
		minWidth: '300px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgb(244,244,244)',
		padding: '0.55em',
		border: '1px solid rgb(44, 44, 44)',
		boxShadow: 'none',
	},
	avatarContainer: {
		margin: '0 1em',
	},
	status: {
		width: '10px',
		height: '10px',
		borderRadius: '50%',
		color: 'white',
		margin: '0 5px',
	},
	redStatus: { backgroundColor: 'red' },
	greenStatus: { backgroundColor: 'green' },
	playerName: {
		fontWeight: 'bold',
		fontSize: '1.15rem',
	},

	button: {
		backgroundColor: 'rgb(53,52,131)',
		margin: '0.5em 0',
	},
});

const PlayerCard = ({ player, handlePlayerUpdate }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.cardStyles} maxWidth="sm">
			<Avatar className={classes.avatarContainer}>
				<AccountCircleIcon />
			</Avatar>
			<Box>
				<Box>
					<Typography variant="p" className={classes.playerName}>
						{player.username}
					</Typography>
					<Chip
						className={
							!player.platformAccess
								? `${classes.status} ${classes.redStatus}`
								: `${classes.status} ${classes.greenStatus}`
						}
					/>
				</Box>
				<Typography variant="subtitle1">{player.email}</Typography>
				<Button
					variant="contained"
					className={classes.button}
					onClick={() => handlePlayerUpdate(player.email)}
					disableElevation
				>
					{!player.platformAccess ? 'Revert Ban' : 'Ban Player'}
				</Button>
			</Box>
		</Paper>
	);
};

export default PlayerCard;
