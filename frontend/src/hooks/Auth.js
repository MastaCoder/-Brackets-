import { useContext, useState } from 'react';
import AuthContext from '../contexts/authContext';

// For any component that wants access to the user form the auth context
const useAuth = () => {
  return useContext(AuthContext);
}

// Provide hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState(false);

  /* Add your function handlers */
  const signin = (newUser, cb) => {
    setUser(newUser);
    if(user) cb();
  };

  const signout = (cb) => {
    setUser(false);
    if(user) cb();
  };

  return { user, signin, signout };
}

export { useAuth, useProvideAuth };

