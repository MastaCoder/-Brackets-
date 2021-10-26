import { Link, NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.bracketsNavbar}>
      <div className={styles.bracketsLogo}>
        <Link to="/">[Brackets]</Link>
      </div>
      <div className={styles.bracketsNavbarOpts}>
        <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/register">Register</NavLink>
        <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/login">Login</NavLink>
      </div>
    </div>
  )
}

export default Navbar;