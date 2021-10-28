import TournamentCard from "../TournamentCard/TournamentCard";
import Styles from "./TournamentList.module.css";

export default function TournamentList(props) {
  return (
    <div>
      <h2>{props.header}</h2>
      <div className={Styles.tournamentsContainer}>
        {props.tournaments.map((tournament, index) => {
          return (
            <div>
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
