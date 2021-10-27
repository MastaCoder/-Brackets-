import { Link, NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useAuth } from '../../hooks/Auth'; 

const Navbar = () => {
  const auth = useAuth();
  
  const renderNavbar = () => {
    return auth ? 
    (
      null
    ) : (
      <>
        <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/register">Register</NavLink>
        <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/login">Login</NavLink>
      </>
    )
  }

  return (
    <div className={styles.bracketsNavbar}>
      <div className={styles.bracketsLogo}>
        <Link to="/">[Brackets]</Link>
      </div>
      <div className={styles.bracketsNavbarOpts}>
        {renderNavbar()}
      </div>
    </div>
  )
}

export default Navbar;