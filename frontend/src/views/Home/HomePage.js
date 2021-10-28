import { Link } from "react-router-dom";
import Background from "../../images/homepageBackground.svg";
import Styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";

export default function HomePage() {
  return (
    <div className={`${Styles.main} ${Styles.verticalContainer}`}>
      <img src={Background} alt="" className={Styles.bg} />

      {/* {Main title} */}
      <div
        className={`${Styles.titleContainerMargins} ${Styles.verticalContainer}`}
        style={{ alignItems: "center" }}
      >
        <h1 className={Styles.title}>[Brackets]</h1>
        <h5 className={Styles.titleSub}>Tournament management made easy</h5>
      </div>

      {/* {Try it out} */}
      <div
        className={Styles.verticalContainer}
        style={{ alignItems: "center" }}
      >
        <h5 className={Styles.tryItOut}>What are you waiting for?</h5>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            className={Styles.btn}
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

        <p className={Styles.regText}>
          Looking to join a tournament? Register as a player{" "}
          <Link className={Styles.here} to="/register">
            here!
          </Link>
        </p>
      </div>
    </div>
  );
}
