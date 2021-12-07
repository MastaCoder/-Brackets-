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

  // kicks a user from a team, forms their own new team
  const onKickFromTeam = (userName) => {
  }

  const onJoinTournament = async () => {
    try {
      const res = await axios.post(`/api/tournaments/join/${props.match.params.id}`);
      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onKickTournament = async (userToRemove) => {
    try {
      const res = await axios.post(`/api/tournaments/kick/${props.match.params.id}`, {
        userToRemove: userToRemove
      });

      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onTeamNameChange = async (newName) => {
    if (newName === tournament.userTeam)
      return;

    try {
      const res = await axios.patch(`/api/tournaments/teams/changename/${props.match.params.id}`, {
        groupName: tournament.userTeam,
        newGroupName: newName
      });

      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onTeamKick = async (kickedUser) => {
    try {
      const res = await axios.post(`/api/tournaments/teams/kick/${props.match.params.id}`, {
        groupName: tournament.userTeam,
        kickedUser: kickedUser
      });

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
          kickTournament={onKickTournament}
          teamNameChange={onTeamNameChange}
          teamKick={onTeamKick}
        />
      ) : (
        <Box textAlign="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
}