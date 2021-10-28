import Card from "../../Card/Card";
import Button from "../../Button/Button";
import Styles from "./TournamentCard.module.css";

export default function TournamentCard(props) {
  return (
    <Card>
      <h2 className={Styles.title}>{props.title}</h2>
      <div className={Styles.descriptionContainer}>
        <p className={Styles.description}>{props.description}</p>
      </div>
      <div className={Styles.tournamentInfoContainer}>
        <div
          className={Styles.tournamentInfoTag}
          style={{ background: "#23A6F0" }}
        >
          {props.teamCount} Teams
        </div>
        <div
          className={Styles.tournamentInfoTag}
          style={{ background: "#A223F0" }}
        >
          {props.memberCount} Members
        </div>
        <div
          className={Styles.tournamentInfoTag}
          style={{
            background:
              props.tournamentPrivacy === "private" ? "#B2B2B2" : "#0EAA00",
          }}
        >
          {props.tournamentPrivacy}
        </div>
        <div
          className={Styles.tournamentInfoTag}
          style={{
            background:
              props.tournamentStatus === "On-going" ? "orange" : "red",
          }}
        >
          {props.tournamentStatus}
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button cs={{width: "50%", borderRadius: 25}}>View Event Details</Button>
      </div>
    </Card>
  );
}
