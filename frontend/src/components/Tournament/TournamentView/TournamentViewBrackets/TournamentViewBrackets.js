import PageSubTitle from "../../../Layout/PageSubTitle";
import {Bracket} from "react-brackets";
import {Box, Button, FormControl, MenuItem, Select} from "@mui/material";
import bracketsConverter from "../../../../lib/bracketsConverter";
import {useState} from "react";
import {uid} from "react-uid";

export default function TournamentViewBrackets(props) {
  const [pairSelector, setPairSelector] = useState(new Array(props.tournament.brackets.at(-1).length).fill(-1));

  const updateSelector = (index, value) => {
    let pairSelectorCopy = [...pairSelector];
    pairSelectorCopy[index] = value;
    setPairSelector(pairSelectorCopy);
  }

  const nextRound = (event) => {
    event.preventDefault();
    if (pairSelector.includes(-1)) {
      alert("Make sure every pair is selected!");
      return;
    }

    alert("To be done in phase 2: " + pairSelector);
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

      {props.tournament.host === 'user' && (
        <Box maxWidth={450}>
          <PageSubTitle>
            Update brackets
          </PageSubTitle>
          <Box component="form" mb={4} onSubmit={nextRound}>
            {props.tournament.brackets.at(-1).map((pair, pairIndex) => (
              <FormControl fullWidth margin="normal" key={uid(pair)}>
                <Select
                  value={pairSelector[pairIndex]}
                  onChange={(e) => updateSelector(pairIndex, e.target.value)}
                >
                  {pair.map(single => (
                    <MenuItem value={single} key={single}>
                      {single}
                    </MenuItem>
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
