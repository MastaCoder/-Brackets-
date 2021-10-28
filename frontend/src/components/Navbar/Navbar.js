import{ useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useAuth } from '../../hooks/Auth'; 
import { Avatar, Menu, MenuItem } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  menu: {
    "& .MuiMenu-paper": {
      backgroundColor: "rgb(53,52,131)",
      width: '150px',
      marginTop: '10px',
      color: 'white',
      fontWeight: 'bold'
    }
  }
})

const Navbar = () => {
  const auth = useAuth();
  const [ open, setOpen ] = useState(false);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const classes = useStyles();
  
  const handleAvatarClick = (e) => {
    setAnchorEl(e.target);
    setOpen(!open);
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(!open);
  } 

  const handleSignOut = () => {
    handleMenuClose();
    auth.signout(() => console.log("Logout Successful"));
  }
  

  const renderNavbar = () => {
    return auth.user ? 
    (
      <>
        <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/user">User Dashboard</NavLink>
        <Avatar className={styles.avatar} alt="User Icon" onClick={handleAvatarClick}><AccountCircleIcon/></Avatar> 
      </>
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
      <Menu classes={{ root: classes.menu }} open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <Link className={styles.link} to="/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            Sign Out
          </MenuItem>
        </Menu>
    </div>
  )
}

export default Navbar;