import {Box} from "@mui/material";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Box className={styles.footer}>
      Copyright 2021 - Developed by the <span className={styles.font}>[Brackets]</span> Team
    </Box>
  );
}