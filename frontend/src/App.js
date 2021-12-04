import ProvideAuth from './components/Authentication/ProvideAuth';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import ProfilePage from './views/Profile/ProfilePage';
import HomePage from './views/Home/HomePage';
import LoginPage from './views/Login/LoginPage';
import RegisterPage from './views/Register/RegisterPage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import AdminDashboard from './views/Admin/Dashboard/AdminDashboard';
import UserDashboardPage from './views/User/Dashboard/UserDashboardPage';
import UserHistoryPage from './views/User/History/UserHistoryPage';
import UserJoinPage from './views/User/Join/UserJoinPage';
import OrganizerCreatePage from './views/Organizer/Create/OrganizerCreatePage';
import OrganizerHistoryPage from './views/Organizer/History/OrganizerHistoryPage';
import AdminViewUserPage from './views/Admin/Users/AdminViewUsers';
import AdminViewUserLogs from './views/Admin/Archive/AdminViewUserLogs';
import AdminViewTournaments from './views/Admin/Tournaments/AdminViewTournaments';
import DataContext from './contexts/dataContext';
import data from './data/data';
import { useEffect, useState } from 'react';
import TournamentViewPage from './views/Tournament/View/TournamentViewPage';
import axios from 'axios';

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#6984E1',
			},
		},
		typography: {
			h1: {
				fontFamily: 'Kanit, sans-serif',
			},
			h2: {
				fontFamily: 'Kanit, sans-serif',
			},
			h3: {
				fontFamily: 'Kanit, sans-serif',
			},
			h4: {
				fontFamily: 'Kanit, sans-serif',
			},
			h5: {
				fontFamily: 'Kanit, sans-serif',
			},
			h6: {
				fontFamily: 'Kanit, sans-serif',
			},
		},
	});

	const dataState = useState(data);
	const [sessionUser, setSessionUser] = useState(null);

	useEffect(() => {
		if (!sessionUser) {
			axios.get('/api/session/validate').then((res) => {
				const user = res.data.currentUser;
				if (user) setSessionUser(user);
			});
		}
	}, [sessionUser]);

	const handleSessionUser = () => {
		// Need to do this check seperately to avoid redirection on page refresh
		if (!sessionUser) return;
		return sessionUser?.type === 'user' ? (
			<Redirect to="/user" />
		) : (
			<Redirect to="/dashboard" />
		);
	};

	return (
		<DataContext.Provider value={dataState}>
			<ProvideAuth sessionUser={sessionUser}>
				<ThemeProvider theme={theme}>
					<Router>
						{handleSessionUser()}
						<Navbar setSessionUser={setSessionUser} />
						<Switch>
							<Route exact path="/">
								<HomePage />
							</Route>
							<Route exact path="/login">
								<LoginPage />
							</Route>
							<Route exact path="/register">
								<RegisterPage />
							</Route>
							<PrivateRoute exact path="/settings">
								<ProfilePage />
							</PrivateRoute>
							<PrivateRoute exact path="/dashboard">
								<AdminDashboard />
							</PrivateRoute>
							<PrivateRoute exact path="/admin/users">
								<AdminViewUserPage />
							</PrivateRoute>
							<PrivateRoute exact path="/admin/userLogs">
								<AdminViewUserLogs />
							</PrivateRoute>
							<PrivateRoute
								exact
								path="/admin/tournaments/:filter"
								component={AdminViewTournaments}
							/>
							<PrivateRoute exact path="/user">
								<UserDashboardPage />
							</PrivateRoute>
							<PrivateRoute exact path="/user/history">
								<UserHistoryPage />
							</PrivateRoute>
							<PrivateRoute exact path="/user/join">
								<UserJoinPage />
							</PrivateRoute>
							<Route exact path="/org/create">
								<OrganizerCreatePage />
							</Route>
							<Route exact path="/org/history">
								<OrganizerHistoryPage />
							</Route>
							<Route
								exact
								path="/tournament/:id"
								component={TournamentViewPage}
							/>
						</Switch>
					</Router>
				</ThemeProvider>
			</ProvideAuth>
		</DataContext.Provider>
	);
}

export default App;
