import styles from "./HomePage.module.css";
import {Box, Typography, Button} from "@mui/material";
import {useHistory} from "react-router";
import {useEffect} from "react";
import {useAuth} from "../../hooks/Auth";

export default function HomePage() {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user) history.push("/user");
  }, [history, user]);

  return (
    <Box className={styles.main}>
      <Box
        pt={20}
        textAlign="center"
        color="white"
      >
        {/* Title section */}
        <Typography variant="h1" className={styles.title}>
          [ Brackets ]
        </Typography>
        <Typography variant="h6">
          Tournament management made easy.
        </Typography>

        {/* Buttons section*/}
        <Box mt={14}>
          <Typography variant="h5" className={styles.whatSectionTitle}>
            What are you waiting for?
          </Typography>
          <Box mt={1}>
            <Button
              variant="contained"
              size="large"
              onClick={() => { history.push("/register") }}
            >
              Register for an account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
