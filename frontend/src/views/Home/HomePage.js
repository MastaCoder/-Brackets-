import { Button, Container, Typography } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import { Link } from "react-router-dom";
import Background from "../../images/homepageBackground.svg";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.main}>
      <img src={Background} alt="" className={styles.bg} />

      <Container disableGutters>
        {/* {Main title} */}
        <Box
          sx={{
            mt: "4rem",
            mb: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" className={styles.title}>
            [Brackets]
          </Typography>

          <Typography className={styles.titleSub}>
            Tournament management made easy
          </Typography>
        </Box>

        {/* {Try it out} */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" className={styles.tryItOut}>
            What are you waiting for?
          </Typography>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button className={styles.btn} variant="contained" size="large">
              Register for free
            </Button>
          </Link>

          <Typography variant="caption" className={styles.regText}>
            Looking to join a tournament? Register as a player{" "}
            <Link className={styles.here} to="/register">
              here!
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
