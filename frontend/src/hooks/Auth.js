import { useContext, useState } from 'react';
import AuthContext from '../contexts/authContext';

// For any component that wants access to the user form the auth context
const useAuth = () => {
	return useContext(AuthContext);
};

// Provide hook that creates auth object and handles state
const useProvideAuth = (sessionUser) => {
	const [user, setUser] = useState(sessionUser);

	/* Add your function handlers */
	const signin = (newUser, cb = () => {}) => {
		setUser(newUser);
		cb();
	};

	const signout = (cb = () => {}) => {
		setUser(null);
		cb();
	};

	return { user, signin, signout };
};

export { useAuth, useProvideAuth };
