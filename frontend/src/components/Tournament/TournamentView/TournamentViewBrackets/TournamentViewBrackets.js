import PageSubTitle from '../../../Layout/PageSubTitle';
import { Bracket } from 'react-brackets';
import { Box } from '@mui/material';

export default function TournamentViewBrackets() {
	const rounds = [
		{
			title: 'Round one',
			seeds: [
				{
					teams: [{ name: 'Team A' }, { name: 'Team C' }],
				},
				{
					teams: [{ name: 'Team C' }, { name: 'Team D' }],
				},
			],
		},
		{
			title: 'Round Two',
			seeds: [
				{
					teams: [{ name: 'Team A' }, { name: 'Team C' }],
				},
			],
		},
		{
			title: 'Winner',
			seeds: [
				{
					id: 4,
					teams: [{ name: 'Team A' }],
				},
			],
		},
	];

	return (
		<>
			<PageSubTitle>Brackets View</PageSubTitle>

			<Box my={2}>
				<Bracket rounds={rounds} mobileBreakpoint={0} />
			</Box>
		</>
	);
}
