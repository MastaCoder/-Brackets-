import PageSubTitle from "../../../Layout/PageSubTitle";
import {Bracket} from "react-brackets";
import {Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import bracketsConverter from "../../../../lib/bracketsConverter";
import {useEffect, useState} from "react";
import {uid} from "react-uid";
import {useAuth} from "../../../../hooks/Auth";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti'

export default function TournamentViewBrackets(props) {
  const { user } = useAuth();
  const [pairSelector, setPairSelector] = useState(new Array(props.tournament.brackets.at(-1).length).fill(null));
  const [error, setError] = useState(false);
  const { width, height } = useWindowSize();
  const [winnerEffect, setWinnerEffect] = useState(false);

  const isHost = props.tournament.host === user.username || user.type === 'admin';
  const tournyEnded = props.tournament.brackets.at(-1)?.at(-1)?.at(-1) === null &&
    props.tournament.brackets.at(-1).length === 1;

  useEffect(() => {
    setPairSelector(new Array(props.tournament.brackets.at(-1).length).fill(null));
  }, [props.tournament.brackets]);

  useEffect(() => {
    if (tournyEnded) {
      setWinnerEffect(true);
      setTimeout(() => {
        setWinnerEffect(false);
      }, 7000);
    }
  }, [props.tournament.brackets]);

  const updateSelector = (index, value) => {
    let pairSelectorCopy = [...pairSelector];
    pairSelectorCopy[index] = value;
    setPairSelector(pairSelectorCopy);
  }

  const nextRound = (event) => {
    event.preventDefault();
    setError(false);
    if (pairSelector.includes(null)) {
      setError(true);
      return;
    }

    props.nextBracket(pairSelector);
  }

	return (
		<>
      {tournyEnded && (
        <Box mt={7} mb={5} textAlign="center">
          <Typography variant="h4">
            Tournament Winner
          </Typography>
          <Typography variant="h1">
            {props.tournament.brackets.at(-1)?.at(-1)[0]}!
          </Typography>
        </Box>
      )}

			<PageSubTitle>Brackets View</PageSubTitle>

      <Box my={2}>
        <Bracket
          rounds={bracketsConverter(props.tournament.brackets)}
          mobileBreakpoint={0}
        />
      </Box>

      {isHost && props.tournament.status === 1 && (
        <Box maxWidth={450}>
          <PageSubTitle>
            Update brackets
          </PageSubTitle>
          {error && (
            <Alert severity="warning">
              Make sure you select all the team pairs!
            </Alert>
          )}
          <Box component="form" mb={4} onSubmit={nextRound}>
            {props.tournament.brackets.at(-1).map((pair, pairIndex) => (
              <FormControl fullWidth margin="normal" key={uid(pair)}>
                <InputLabel id={`team-${pairIndex}`}>Team {pairIndex + 1}</InputLabel>
                <Select
                  value={pairSelector[pairIndex]}
                  onChange={(e) => updateSelector(pairIndex, e.target.value)}
                  label={`team-${pairIndex}`}
                >
                  {pair.map((single) => (
                    single !== null && (
                      <MenuItem value={single} key={single}>
                        {single}
                      </MenuItem>
                    )
                  ))}
                </Select>
              </FormControl>
            ))}
            <Box mt={2}>
              <Button
                variant="contained"
                color="success"
                type="submit"
              >
                Proceed to next round
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {winnerEffect && (
        <Confetti
          width={width - 30}
          height={height - 30}
          numberOfPieces={50}
        />
      )}
    </>
  )
}
