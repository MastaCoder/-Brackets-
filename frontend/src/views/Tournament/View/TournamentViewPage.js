import TournamentView from "../../../components/Tournament/TournamentView/TournamentView";

export default function TournamentViewPage(props) {
  // Here would be some sort of API middleman, but for phase 1
  // we're just hardcoding in events
  switch (parseInt(props.match.params.id)) {
    case 1:
      return (
        <TournamentView
          tournament={{
            id: 1,
            name: "CSSU Games Night - League of Legends",
            description: "Join us for the CSSU game night, featuring League of Legends! We run this event weekly with" +
              "registration done at the front office room BA1010",
            public: true,
            members: 72,
            teams: 12,
            status: 1
          }}
        />
      );
    default:
      return (
        <TournamentView
          tournament={{}}
        />
      );
  }
}