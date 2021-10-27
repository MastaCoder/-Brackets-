import { Button, Container, Typography } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import { Link } from "react-router-dom";
import Background from "../../images/homepageBackground.svg";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <Container disableGutters className={styles.main} maxWidth={false}>
      <img src={Background} alt="" className={styles.bg} />

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
        <h1 className={styles.title}>[Brackets]</h1>
        <h5 className={styles.titleSub}>Tournament management made easy</h5>
      </Box>

      {/* {Try it out} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 className={styles.tryItOut}>What are you waiting for?</h5>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button className={styles.btn} variant="contained" size="large">
            Register for free
          </Button>
        </Link>

        <p className={styles.regText}>
          Looking to join a tournament? Register as a player{" "}
          <Link className={styles.here} to="/register">
            here!
          </Link>
        </p>
      </Box>
    </Container>
  );
}
