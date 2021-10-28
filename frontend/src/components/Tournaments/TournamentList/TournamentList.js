import Styles from "./TournamentList.module.css";

export default function TournamentList(props) {
  return (
    <div>
      <h2>{props.header}</h2>
      <ul>{props.tournaments.map((tournmanet, index) => {
          return (
            <li key={index}>{tournmanet.tournamentTitle}</li>
          );
      })}</ul>
    </div>
  );
}
