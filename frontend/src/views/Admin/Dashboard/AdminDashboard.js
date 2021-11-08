import {
	Container,
	Box,
	Button,
	Typography,
	Grid,
} from '@mui/material';
import { useHistory } from 'react-router';
import DataContext from '../../../contexts/dataContext';
import { useContext } from 'react';
import PageTitle from "../../../components/Layout/PageTitle";
import AdminCounter from "../../../components/AdminCounter/AdminCounter";
import PageSubTitle from "../../../components/Layout/PageSubTitle";

export default function AdminDashboard() {
  const [data] = useContext(DataContext);
	const history = useHistory();

	return (
		<Container maxWidth="md">
			<PageTitle>
				Admin Dashboard
			</PageTitle>

			<PageSubTitle>
				General Stats
			</PageSubTitle>
			<Grid container spacing={2} justifyContent="center">
				<AdminCounter
					title="Registered users"
					number={data.players.length}
				/>
				<AdminCounter
					title="Banned users"
					number={data.players.filter(player => player.isBanned).length}
				/>
				<AdminCounter
					title="All Events"
					number={data.tournaments.length}
				/>
				<AdminCounter
					title="Active Events"
					number={data.tournaments.filter(tournament => tournament.status !== 2).length}
				/>
			</Grid>
			<Box mt={0.75} mb={3}>
				<Typography variant="caption" color="grey">
					Info last updated {Date().toLocaleString()}
				</Typography>
			</Box>

			<PageSubTitle>
				User options
			</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					onClick={() => {
						history.push("/admin/users");
					}}
				>
					Manage Users
				</Button>
			</Box>

			<PageSubTitle>
				Event options
			</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					color="info"
					onClick={() => {
						history.push("/admin/tournaments/all");
					}}
				>
					View all
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push("/admin/tournaments/notstarted");
					}}
				>
					View open events
				</Button>
				<Button
					variant="contained"
					color="warning"
					onClick={() => {
						history.push("/admin/tournaments/ongoing");
					}}
				>
					View On-Going Events
				</Button>
			</Box>

			<PageSubTitle>
				Archive
			</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					color="info"
					onClick={() => {
						history.push("/admin/tournaments/finished");
					}}
				>
					View past tournaments
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push("/admin/userLogs");
					}}
				>
					View user logs
				</Button>
			</Box>
		</Container>
	);
}
