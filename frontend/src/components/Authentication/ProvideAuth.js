import { useProvideAuth } from '../../hooks/Auth';
import AuthContext from '../../contexts/authContext';
import { useEffect } from 'react';

const ProvideAuth = ({ sessionUser, children }) => {
	const auth = useProvideAuth(sessionUser);
	// If the session user exists then we sign it in here
	useEffect(() => {
		if (sessionUser) auth.signin(sessionUser);
	}, [auth, sessionUser]);

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default ProvideAuth;
