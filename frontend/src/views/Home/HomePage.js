import { Link } from "react-router-dom";
import Background from "../../images/homepageBackground.svg";
import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";

export default function HomePage() {
  return (
    <div className={`${styles.main} ${styles.verticalContainer}`}>
      <img src={Background} alt="" className={styles.bg} />

      {/* {Main title} */}
      <div
        className={`${styles.titleContainerMargins} ${styles.verticalContainer}`}
        style={{ alignItems: "center" }}
      >
        <h1 className={styles.title}>[Brackets]</h1>
        <h5 className={styles.titleSub}>Tournament management made easy</h5>
      </div>

      {/* {Try it out} */}
      <div
        className={styles.verticalContainer}
        style={{ alignItems: "center" }}
      >
        <h5 className={styles.tryItOut}>What are you waiting for?</h5>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            className={styles.btn}
            cs={{
              width: "16rem",
              marginBottom: "1rem",
              minHeight: "4rem",
              fontSize: "25px",
            }}
          >
            Register for free
          </Button>
        </Link>

        <p className={styles.regText}>
          Looking to join a tournament? Register as a player{" "}
          <Link className={styles.here} to="/register">
            here!
          </Link>
        </p>
      </div>
    </div>
  );
}
