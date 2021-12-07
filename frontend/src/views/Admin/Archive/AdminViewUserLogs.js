import {Box, Container} from '@mui/material';
import { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/Table/PaginatedTable';
import axios from 'axios';
import PageTitle from "../../../components/Layout/PageTitle";

export default function AdminViewUserLogs() {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		axios.get('/api/admin/logs').then((res) => {
			const mappedData = res.data.map((log) => {
				return {
					username: log.username,
					action: log.action,
					timestamp: log.timestamp,
				};
			});

			mappedData.sort((a, b) => new Date(a) < new Date(b));
			setLogs(mappedData);
		});
	}, []);

	return (
		<Container component="main">
			<PageTitle>User Logs</PageTitle>
			<Box mt={4}>
				<PaginatedTable columns={['User', 'Action', 'TimeStamp']} rows={logs} />
			</Box>
		</Container>
	);
}
