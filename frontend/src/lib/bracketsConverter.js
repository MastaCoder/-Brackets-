export default function bracketsConverter(brackets) {
  // EYO, WE USED BIT MANIPULATION THIS IS GOOD RIGHT???
  const isPowerOfTwo = (x) => {
    return (x & (x - 1)) === 0;
  }

  let rounds = [];
  brackets.forEach((round, roundIndex) => {
    let finalizedRound = {
      title: "Round #" + (roundIndex + 1),
      seeds: []
    }

    round.forEach((teamPair, teamPairIndex) => {
      let teamPairFinalized = [];
      teamPairFinalized.push({
        name: teamPair[0]
      });

      if (teamPair[1] !== null)
        teamPairFinalized.push({
          name: teamPair[1]
        });
      else
        teamPairFinalized.push({
          name: teamPair[1]
        });

      finalizedRound.seeds.push({
        teams: teamPairFinalized
      });
    });

    while (!isPowerOfTwo(finalizedRound.seeds.length)) {
      finalizedRound.seeds.push([
        {}, {}
      ])
    }

    rounds.push(finalizedRound);
  });

  return rounds;
}