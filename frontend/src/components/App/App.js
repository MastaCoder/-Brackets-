import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from '../../views/LoginPage';



function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
