import styles from './App.module.css';
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
    <div className={styles.App}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage/>
            </Route>
            <Route exact path="/register">
              <RegistrationPage/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
