import { Container, Box, Button, Typography, Grid } from '@mui/material';
import { useHistory } from 'react-router';
import DataContext from '../../../contexts/dataContext';
import { useContext } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import AdminCounter from '../../../components/AdminCounter/AdminCounter';
import PageSubTitle from '../../../components/Layout/PageSubTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
	const [data] = useContext(DataContext);
	const history = useHistory();

  const [numActiveUsers, setNumActiveUsers] = useState(0);
  const [numBannedUsers, setNumBannedUsers] = useState(0);
  const [numTournaments, setNumTournaments] = useState(0);
  const [numOngoingTournaments, setNumOngoingTournaments] = useState(0);

  useEffect(() => {
    // Get num active and banned users
    (async function() {
      const res = await axios.get("/api/admin/platformusers", {});
      let active = 0;
      let banned = 0;
      res.data.forEach(user => {
        user.platformAccess ? active += 1 : banned += 1;
      });
      setNumActiveUsers(active);
      setNumBannedUsers(banned);
    })();
    // Get num active and all tournaments
    (async function() {
      const res = await axios.get("/api/admin/numtournaments", {});
      setNumTournaments(res.data.open + res.data.ongoing + res.data.closed);
      setNumOngoingTournaments(res.data.open);
    })();
  }, []);

	return (
		<Container maxWidth="md">
			<PageTitle>Admin Dashboard</PageTitle>

			<PageSubTitle>General Stats</PageSubTitle>
			<Grid container spacing={2} justifyContent="center">
				<AdminCounter title="Registered users" number={numActiveUsers} />
				<AdminCounter title="Banned users" number={numBannedUsers} />
				<AdminCounter title="# Tournaments" number={numTournaments} />
				<AdminCounter title="# Ongoing" number={numOngoingTournaments} />
			</Grid>
			<Box mt={0.75} mb={3}>
				<Typography variant="caption" color="grey">
					Info last updated {Date().toLocaleString()}
				</Typography>
			</Box>

			<PageSubTitle>User options</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					onClick={() => {
						history.push('/admin/users');
					}}
				>
					Manage Users
				</Button>
			</Box>

			<PageSubTitle>Event options</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					color="info"
					onClick={() => {
						history.push('/admin/tournaments/all');
					}}
				>
					View all
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push('/admin/tournaments/notstarted');
					}}
				>
					View open events
				</Button>
				<Button
					variant="contained"
					color="warning"
					onClick={() => {
						history.push('/admin/tournaments/ongoing');
					}}
				>
					View On-Going Events
				</Button>
			</Box>

			<PageSubTitle>Archive</PageSubTitle>
			<Box mb={4} display="flex" gap={1}>
				<Button
					variant="contained"
					color="info"
					onClick={() => {
						history.push('/admin/tournaments/finished');
					}}
				>
					View past tournaments
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push('/admin/userLogs');
					}}
				>
					View user logs
				</Button>
			</Box>
		</Container>
	);
}
