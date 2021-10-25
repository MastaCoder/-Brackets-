import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
