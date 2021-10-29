import {AppBar, Box, Toolbar, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ boxShadow: "none", backgroundColor: "#3D3B8E" }}>
      {/*<AppBar position="static" className={styles.main}>*/}
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h6" component="div">
              <Link to="/" className={styles.navLink}>
                [ Brackets ]
              </Link>
            </Typography>
          </Box>
          <Link to="/register" className={styles.navLink}>
            <Button color="inherit">Register</Button>
          </Link>
          <Link to="/login" className={styles.navLink}>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}