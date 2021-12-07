import PageSubTitle from "../../../Layout/PageSubTitle";
import {Bracket} from "react-brackets";
import {Alert, Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
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

  useEffect(() => {
    setPairSelector(new Array(props.tournament.brackets.at(-1).length).fill(null));
  }, [props.tournament.brackets]);

  useEffect(() => {
    if (props.tournament.brackets.at(-1)?.at(-1)?.at(-1) === null) {
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
			<PageSubTitle>Brackets View</PageSubTitle>

      <Box my={2}>
        <Bracket
          rounds={bracketsConverter(props.tournament.brackets)}
          mobileBreakpoint={0}
        />
      </Box>

      {props.tournament.host === user.username && props.tournament.status === 1 && (
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
          width={width - 10}
          height={height - 10}
          numberOfPieces={50}
        />
      )}
    </>
  )
}
