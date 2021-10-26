import ProvideAuth from '../Authentication/ProvideAuth';
import PrivateRoute from '../Authentication/PrivateRoute';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ProvideAuth>
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
    </ProvideAuth>
  );
}

export default App;
