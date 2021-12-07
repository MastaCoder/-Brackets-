import TournamentView from "../../../components/Tournament/TournamentView/TournamentView";
import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import axios from "axios";
import {useHistory} from "react-router";

export default function TournamentViewPage(props) {
  const history = useHistory();
  const [tournament, setTournament] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/tournaments/details/${props.match.params.id}`)
      .then((res) => setTournament(res.data.tournament));
  }, [props.match.params.id]);

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

  const onRegenerateLink = async () => {
    try {
      const res = await axios.post(`/api/tournaments/regenerate/${props.match.params.id}`);
      console.log("the fuck?", `/tournament/${res.data.id}`);
      window.location.href = `/tournament/${res.data.id}`; // page needs to be re-rendered
    } catch (err) {
      console.log(err);
    }
  }

  const onTeamJoin = async (groupName) => {
    try {
      const res = await axios.post(`/api/tournaments/teams/join/${props.match.params.id}`, {
        groupName
      });

      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onTournamentUpdate = async (description, pub) => {
    try {
      const res = await axios.patch(`/api/tournaments/updateinfo/${props.match.params.id}`, {
        public: pub,
        description: description
      });

      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onTournamentDelete = async () => {
    try {
      await axios.delete(`/api/tournaments/${props.match.params.id}`);
      history.push("/user");
    } catch (err) {
      console.log(err);
    }
  }

  const onNextStage = async () => {
    try {
      const res = await axios.post(`/api/tournaments/nextstatus/${props.match.params.id}`);
      setTournament(res.data.tournament);
    } catch (err) {
      console.log(err);
    }
  }

  const onNextBracket = async (proceedingTeams) => {
    try {
      const res = await axios.post(`/api/tournaments/nextbracket/${props.match.params.id}`, {
        proceedingTeams: proceedingTeams // this is personal.
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
          regenerateLink={onRegenerateLink}
          joinTeam={onTeamJoin}
          updateTournament={onTournamentUpdate}
          deleteTournament={onTournamentDelete}
          nextStage={onNextStage}
          nextBracket={onNextBracket}
        />
      ) : (
        <Box textAlign="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
}