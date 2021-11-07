import {
	Container,
	Box,
	Button,
	CardContent,
	Card,
	CardActions,
	Typography,
	Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import { useHistory } from 'react-router';

export default function AdminDashboard(props) {
	const cardStyles = {
		height: '100%',
	};

	const history = useHistory();

	return (
		<Container component="main" maxWidth="md">
			<Box
				sx={{
					mt: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
					Admin Dashboard
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card style={cardStyles}>
							<CardContent>
								<Typography gutterBottom variant="h6" component="div">
									Registered Users: 1013
								</Typography>
								<Typography variant="body2" color="text.secondary">
									As of {Date().toLocaleString()}, [Brackets] has{' '}
									<strong>1013</strong> registered users and <strong>49</strong>{' '}
									banned users.
								</Typography>
							</CardContent>
							<CardActions>
								<Link to="/admin/users" className={styles.link}>
									<Button size="small">Manage Users</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card style={cardStyles}>
							<CardContent>
								<Typography gutterBottom variant="h6" component="div">
									Tournaments: 40
								</Typography>
								<Typography variant="body2" color="text.secondary">
									There are currently <strong>40</strong> registered tournaments
									and <strong>2</strong> active tournaments.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">View All</Button>
								<Button size="small" color="success">
									View Ongoing
								</Button>
							</CardActions>
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card style={cardStyles}>
							<CardContent>
								<Typography gutterBottom variant="h6" component="div">
									Archive
								</Typography>
								<Typography variant="body2" color="text.secondary">
									View past tournaments and archived user logs.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Past Tournaments</Button>
								<Button size="small" onClick={() => history.push("/admin/userLogs")}>User Logs</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}