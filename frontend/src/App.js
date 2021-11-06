import ProvideAuth from './components/Authentication/ProvideAuth';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import ProfilePage from './views/Profile/ProfilePage';
import HomePage from './views/Home/HomePage';
import LoginPage from './views/Login/LoginPage';
import RegisterPage from './views/Register/RegisterPage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminDashboard from './views/Dashboards/AdminDashboard/AdminDashboard';
import UserDashboardPage from './views/User/Dashboard/UserDashboardPage';
import UserHistoryPage from "./views/User/History/UserHistoryPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6984E1"
      }
    },
  });

  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/register">
              <RegisterPage/>
            </Route>
            <PrivateRoute exact path="/user">
              <UserDashboardPage />
            </PrivateRoute>
            <PrivateRoute exact path="/user/history">
              <UserHistoryPage />
            </PrivateRoute>
            <PrivateRoute exact path="/user">
             <UserDashboardPage />
            </PrivateRoute>
            <Route exact path="/tournament/:id">
              {/* Add your Tournament view here */}
            </Route>
            <PrivateRoute exact path="/dashboard">
              <AdminDashboard/>
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <ProfilePage
                username="user"
                email="user@user.com"
                password="user"
              />
            </PrivateRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default App;
