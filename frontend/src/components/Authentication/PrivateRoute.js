import { useAuth } from "../../hooks/Auth";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
  const auth = useAuth();
  return (
    <Route
    {...rest}
    render={({ location }) =>
      auth.user ? (
        children
      ) : (
        children
        // <Redirect
        //   to={{
        //     pathname: "/login",
        //     state: { from: location },
        //   }}
        // />
      )
    }
  />
  );
}

export default PrivateRoute;