import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth.js';
import { useHistory } from 'react-router';
import styles from './Navbar.module.css';

export default function Navbar() {
	const { user, signout } = useAuth();
	const history = useHistory();

	return (
		<Box flexGrow={1}>
			<AppBar
				position="static"
				sx={{ boxShadow: 'none', backgroundColor: '#3D3B8E' }}
			>
				{/*<AppBar position="static" className={styles.main}>*/}
				<Toolbar>
					<Box flexGrow={1}>
						<Typography variant="h6" component="div">
							<Link to="/" className={styles.navLink}>
								[ Brackets ]
							</Link>
						</Typography>
					</Box>
					{!user ? (
						<>
							<Link to="/register" className={styles.navLink}>
								<Button color="inherit">Register</Button>
							</Link>
							<Link to="/login" className={styles.navLink}>
								<Button color="inherit">Login</Button>
							</Link>
						</>
					) : (
						<>
							<Link to="/user" className={styles.navLink}>
								<Button color="inherit">Dashboard</Button>
							</Link>
							{user.type === 'admin' && (
								<Link to="/dashboard" className={styles.navLink}>
									<Button color="inherit">Admin Dashboard</Button>
								</Link>
							)}
							<Link to="/settings" className={styles.navLink}>
								<Button color="inherit">Profile</Button>
							</Link>
							<Link
								to="/"
								className={styles.navLink}
								onClick={() => signout(() => history.push('/'))}
							>
								<Button color="inherit">Logout</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
