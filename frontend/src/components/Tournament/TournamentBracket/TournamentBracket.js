import { Bracket } from "react-brackets";

const rounds = [
  {
    title: "Round one",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team B" }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round Two",
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
  {
    title: "Winner",
    seeds: [
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }],
      },
    ],
  },
];

export default function TournamnetBracket() {
  return <Bracket rounds={rounds} mobileBreakpoint={0} />;
}
