import TournamentCard from "../TournamentCard/TournamentCard";
import Styles from "./TournamentCardList.module.css";

export default function TournamentList(props) {
  return (
    <div style={{ margin: "4rem 8rem" }}>
      <h2>{props.header}</h2>
      <div className={Styles.tournamentsContainer}>
        {props.tournaments.map((tournament, index) => {
          return (
            <div style={{ margin: "2rem 2rem 2rem 0" }}>
              <TournamentCard
                key={index}
                title={tournament.tournamentTitle}
                description={tournament.tournamentDescription}
                teamCount={tournament.teams}
                memberCount={tournament.members}
                tournamentPrivacy={tournament.privacy}
                tournamentStatus={tournament.status}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
