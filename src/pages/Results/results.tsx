import {
  Player,
  PlayerScores,

} from '../../shared.types';

import {
  calculateDistinctScoreTotal,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
} from '../../utils';

import './results.css';

interface ResultsProps {
  playerScores: PlayerScores;
}

function Results({ playerScores }: ResultsProps) {
  const keyToScoringMethodMapping = {
    civilian: calculateDistinctScoreTotal,
    coins: calculateCoinsTotal,
    commercial: calculateDistinctScoreTotal,
    guildBase: calculateGuildBaseTotal,
    military: (value: number) => (value),
    progress: calculateProgressTokensTotal,
    science: calculateDistinctScoreTotal,
    wonders: calculateWonderTotal,
  };

  const keyToRowTitle = {
    guildBase: 'Guild',
  };

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Player 1</td>
            <td>Player 2</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(playerScores[Player.One]).map((key) => (
              <tr
                key={`${key}-table-row`}
              >
                <td>
                  {
                    keyToRowTitle[key as keyof typeof keyToRowTitle]
                    || capitalizeFirstLetter(key)
                  }
                </td>
                <td>
                  {
                    // @ts-expect-error @todo Need to figure out how to properly
                    // allow each defined type in Scoring to be passed as a
                    // method parameter
                    keyToScoringMethodMapping[key as keyof typeof keyToScoringMethodMapping](playerScores[Player.One][key as ScoringKeys])
                  }
                </td>
                <td>
                  {
                    // @ts-expect-error @todo Need to figure out how to properly
                    // allow each defined type in Scoring to be passed as a
                    // method parameter
                    keyToScoringMethodMapping[key as keyof typeof keyToScoringMethodMapping](playerScores[Player.Two][key as ScoringKeys])
                  }
                </td>
              </tr>
            ))
          }
          <tr>
            <td>Total</td>
            <td>{calculateTotalScore(playerScores, Player.One)}</td>
            <td>{calculateTotalScore(playerScores, Player.Two)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Results;