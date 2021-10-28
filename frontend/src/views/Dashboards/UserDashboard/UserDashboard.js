import { useState } from "react";
import TournamentCardList from "../../../components/Tournaments/TournamentList/TournamentCardList";
import TournamentList from "../../../components/Tournaments/TournamentList/TournamentList";
import Styles from "./UserDashboard.module.css";

export default function UserDashboard() {
  const [tournaments, setTournaments] = useState([
    {
      tournamentTitle: "Tournament 1",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 2",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 3",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 4",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
  ]);

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className={Styles.tournamentListsContainer}>
        <TournamentCardList header="Current Tournaments" tournaments={tournaments}/>
        <TournamentList header="Past Tournaments" tournaments={tournaments} />
      </div>
    </div>
  );
}
