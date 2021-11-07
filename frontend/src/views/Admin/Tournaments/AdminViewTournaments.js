import { Container } from '@mui/material';
import { useState } from 'react';
import PageTitle from '../../../components/Layout/PageTitle';
import TournamentCardList from '../../../components/Tournament/TournamentList/TournamentCardList';
import data from '../../../data/data';

const AdminViewTournaments = (props) => {
	const [tournaments, setTournaments] = useState(data.tournaments);
    
	return (
		<Container component="main">
			<PageTitle variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
				View Tournaments
			</PageTitle>
			<TournamentCardList cards={ tournaments.filter(tournament => {
        if (props.match.params.filter === "all") return true
        else if (props.match.params.filter === "notstarted") return tournament.status === 0
        else if (props.match.params.filter === "ongoing") return tournament.status === 1
        else if (props.match.params.filter === "finished") return tournament.status === 2
      }) }/>
		</Container>
	);
};

export default AdminViewTournaments;
