import PageSubTitle from "../../../Layout/PageSubTitle";
import {Bracket} from "react-brackets";
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import bracketsConverter from "../../../../lib/bracketsConverter";
import {useState} from "react";
import {uid} from "react-uid";
import {useAuth} from "../../../../hooks/Auth";

export default function TournamentViewBrackets(props) {
  const { user } = useAuth();
  const [pairSelector, setPairSelector] = useState(new Array(props.tournament.brackets.at(-1).length).fill(null));
  // const [pairSelector, setPairSelector] = useState(props.tournament.brackets.at(-1).map(e => e[0]));

  const updateSelector = (index, value) => {
    let pairSelectorCopy = [...pairSelector];
    pairSelectorCopy[index] = value;
    setPairSelector(pairSelectorCopy);
  }

  const nextRound = (event) => {
    event.preventDefault();
    if (pairSelector.includes(null)) {
      alert("Make sure every pair is selected!"); // @todo change this with a modal
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

      {props.tournament.host === user.username && (
        <Box maxWidth={450}>
          <PageSubTitle>
            Update brackets
          </PageSubTitle>
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
    </>
  )
}
