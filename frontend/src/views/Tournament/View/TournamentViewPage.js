import TournamentView from "../../../components/Tournament/TournamentView/TournamentView";
import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import axios from "axios";

export default function TournamentViewPage(props) {
  const [tournament, setTournament] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/tournaments/details/${props.match.params.id}`)
      .then((res) => setTournament(res.data.tournament));
  }, [props.match.params.id]);

  // kick a user, to be replaced with an API call in the future
  const kickUser = (userName) => {

  }

  // kicks a user from a team, forms their own new team
  const onKickFromTeam = (userName) => {
  }

  // Update the name of a team
  const onNameUpdate = (oldName, newName) => {

  }

  const onJoinTournament = async () => {
    try {
      const res = await axios.post(`/api/tournaments/join/${props.match.params.id}`);
      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {tournament !== false ? (
        <TournamentView
          tournament={tournament}
          joinTournament={onJoinTournament}

          onKickUser={kickUser}
          onKickFromTeam={onKickFromTeam}
          onTeamNameUpdate={onNameUpdate}
        />
      ) : (
        <Box textAlign="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
}