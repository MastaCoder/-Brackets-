import ProvideAuth from '../Authentication/ProvideAuth';
import PrivateRoute from '../Authentication/PrivateRoute';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from '../../views/LoginPage';
import RegistrationPage from '../../views/RegistrationPage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

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
            <h1>Home Page</h1>
          </Route>
          <Route exact path="/login">
            <h1>Login</h1>
          </Route>
          <Route exact path="/register">
            <h1>Register Here</h1>
          </Route>
          <PrivateRoute exact path="/dashboard">
            <h1>Dashboard</h1>
          </PrivateRoute>
        </Switch>
      </Router>
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default App;
