import { useState } from "react";
import TournamentList from "../../../components/Tournaments/TournamentList/TournamentCardList";

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
      tournamentTitle: "Tournament 1",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 1",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
    {
      tournamentTitle: "Tournament 1",
      tournamentDescription: "This is a league tournament!",
      teams: 50,
      members: 50,
      privacy: "public",
      status: "On-going",
    },
  ]);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>User Dashboard</h1>
      <TournamentList header="Current Tournaments" tournaments={tournaments}/>
    </div>
  );
}
