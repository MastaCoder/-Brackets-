import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PageTitle from '../../../components/Layout/PageTitle';
import TournamentCardList from '../../../components/Tournament/TournamentList/TournamentCardList';

const AdminViewTournaments = (props) => {
  const [tournaments, setTournaments] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Get num active and banned users
    (async function () {
      let status;
      if (props.match.params.filter === "all") status = -1;
      else if (props.match.params.filter === "notstarted") status = 0;
      else if (props.match.params.filter === "ongoing") status = 1;
      else if (props.match.params.filter === "finished") status = 2;
      else history.push('/dashboard');

      const res = await axios.get(`/api/admin/listtournaments/${status}`, {});
      setTournaments(res.data);
    })();
  }, [history, props.match.params.filter]);
    
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
