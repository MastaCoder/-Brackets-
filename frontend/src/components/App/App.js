import ProvideAuth from '../Authentication/ProvideAuth';
import PrivateRoute from '../Authentication/PrivateRoute';
import Navbar from '../Navbar/Navbar';
import LoginPage from '../../views/LoginPage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(53,52,131)"
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
            <LoginPage/>
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
