import { Container } from '@mui/material';
import { useState } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import TournamentCardList from '../../../components/Tournament/TournamentList/TournamentCardList';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const AdminViewTournaments = (props) => {
  useEffect(() => {
    // Get num active and banned users
    (async function () {
      let status;
      if (props.match.params.filter === "all") status = -1;
      else if (props.match.params.filter === "notstarted") status = 0;
      else if (props.match.params.filter === "ongoing") status = 1;
      else history.push('/dashboard');

      const res = await axios.get(`/api/admin/listtournaments/${status}`, {});
      setTournaments(res.data);
    })();
  }, []);

	const [tournaments, setTournaments] = useState([]);
  const history = useHistory();
    
	return (
		<Container component="main">
			<PageTitle variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
				View Tournaments
			</PageTitle>
			<TournamentCardList cards={tournaments}/>
		</Container>
	);
};

export default AdminViewTournaments;
