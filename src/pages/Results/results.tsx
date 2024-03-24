import {
  useContext,
} from 'react';

import {
  Player,
  PlayerScores,

} from '../../shared.types';

import {
  calculateDivinityScores,
  calculateDistinctScoreTotal,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
} from '../../utils';

import { ActivatedExpansionsContext } from '../../context';

import './results.css';

interface ResultsProps {
  playerScores: PlayerScores;
}

function Results({ playerScores }: ResultsProps) {
  const {
    activeExpansions,
  } = useContext(ActivatedExpansionsContext);

  const playerOneTotalScore = calculateTotalScore(playerScores, Player.One);
  const playerTwoTotalScore = calculateTotalScore(playerScores, Player.Two);

  const keyToScoringMethodMapping = {
    civilian: calculateDistinctScoreTotal,
    coins: calculateCoinsTotal,
    commercial: calculateDistinctScoreTotal,
    divinity: calculateDivinityScores,
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
    <div
      className="results-table"
    >
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
            Object.keys(playerScores[Player.One]).map((key) => {
              if (!keyToScoringMethodMapping[key as keyof typeof keyToRowTitle]) {
                console.error(
                  `${key} is not set in keyToScoringMethodMapping\n`
                  + `${key} will not be rendered in results table`
                );
                return;
              }
              if (activeExpansions.pantheon && key === 'guildBase') {
                return null;
              }
              if (!activeExpansions.pantheon && key === 'divinity') {
                return null;
              }
              return (
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
              );
            })
          }
          <tr>
            <td>Total</td>
            <td
              className={`${(playerOneTotalScore > playerTwoTotalScore) ? "total-winner" : ""}`}
            >
              {playerOneTotalScore}
            </td>
            <td
              className={`${(playerTwoTotalScore > playerOneTotalScore) ? "total-winner" : ""}`}
            >
              {playerTwoTotalScore}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Results;