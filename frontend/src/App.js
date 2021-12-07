import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import PrivateRoute from './components/Authentication/PrivateRoute';
import ProvideAuth from './components/Authentication/ProvideAuth';
import Footer from './components/Layout/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import AdminDashboard from './views/Admin/Dashboard/AdminDashboard';
import HomePage from './views/Home/HomePage';
import LoginPage from './views/Login/LoginPage';
import OrganizerCreatePage from './views/Organizer/Create/OrganizerCreatePage';
import ProfilePage from './views/Profile/ProfilePage';
import RegisterPage from './views/Register/RegisterPage';
import UserDashboardPage from './views/User/Dashboard/UserDashboardPage';
import UserHistoryPage from './views/User/History/UserHistoryPage';
import UserJoinPage from './views/User/Join/UserJoinPage';
import AdminViewUserPage from './views/Admin/Users/AdminViewUsers';
import AdminViewUserLogs from './views/Admin/Archive/AdminViewUserLogs';
import AdminViewTournaments from './views/Admin/Tournaments/AdminViewTournaments';
import TournamentViewPage from './views/Tournament/View/TournamentViewPage';
import axios from 'axios';
import OrganizerHistoryPage from "./views/Organizer/History/OrganizerHistoryPage";

export default function App() {
	const [loading, setLoading] = useState(true);

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

	const [sessionUser, setSessionUser] = useState(null);

	useEffect(() => {
		if (!sessionUser) {
			axios
				.get('/api/session/validate')
				.then((res) => {
					const user = res.data.currentUser;
					if (user) setSessionUser(user);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	}, [sessionUser]);

	if (loading) {
		return <>Validating your login..</>;
	}

	// const handleSessionUser = () => {
	// 	// Need to do this check seperately to avoid redirection on page refresh
	// 	if (!sessionUser) return;
	// 	return sessionUser?.type === 'user' ? (
	// 		<Redirect to="/user" />
	// 	) : (
	// 		<Redirect to="/dashboard" />
	// 	);
	// };

	return (
		<>
			<Box className={styles.mainContainer}>
				<ProvideAuth sessionUser={sessionUser}>
					<ThemeProvider theme={theme}>
						<Router>
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
								<PrivateRoute exact path="/admin">
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
								<PrivateRoute exact path="/org/create">
									<OrganizerCreatePage />
								</PrivateRoute>
								<PrivateRoute exact path="/org/history">
									<OrganizerHistoryPage />
								</PrivateRoute>
								<PrivateRoute
									exact
									path="/tournament/:id"
									component={TournamentViewPage}
								/>
							</Switch>
						</Router>
					</ThemeProvider>
				</ProvideAuth>
			</Box>
			<Footer />
		</>
	);
}
