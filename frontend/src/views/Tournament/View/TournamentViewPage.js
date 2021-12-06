import TournamentView from "../../../components/Tournament/TournamentView/TournamentView";
import {useContext, useEffect, useState} from "react";
import DataContext from "../../../contexts/dataContext";
import {Box, CircularProgress} from "@mui/material";
import axios from "axios";

export default function TournamentViewPage(props) {
  const [tournament, setTournament] = useState(false);

  const [data, setData] = useContext(DataContext);
  const index = parseInt(props.match.params.id) - 1;

  useEffect(() => {
    axios
      .get(`/api/tournaments/details/${props.match.params.id}`)
      .then((res) => setTournament(res.data));
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

  return (
    <>
      {tournament !== false ? (
        <TournamentView
          tournament={tournament}
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