import {
  useContext,
} from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './progress.css';

import Agriculture from '/src/assets/progress-tokens/agriculture.png';
import Mathematics from '/src/assets/progress-tokens/mathematics.png';
import Philosophy from '/src/assets/progress-tokens/philosophy.png';

function Progress() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const mapProgressKeysToIcons = {
    agriculture: Agriculture,
    philosophy: Philosophy,
    mathematics: Mathematics,
  };

  const changeToggleableScore = (progressKey: string): void => {
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        progress: {
          ...playerScore.progress,
          [progressKey]: !playerScore.progress[progressKey],
        },
      },
    }));
  };

  const changeNumericScore = (progressKey: string, score: number): void => {
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        progress: {
          ...playerScore.progress,
          [progressKey]: score,
        },
      },
    }));
  };

  return (
    <div className="progress-score">
      {
        Object.keys(mapProgressKeysToIcons).map((progressKey) => (
          <div
            className="progress-score-row"
            key={`${progressKey}-icon`}
          >
            <img
              src={mapProgressKeysToIcons[progressKey as keyof typeof mapProgressKeysToIcons]}
              alt={`${progressKey} Progress Token Icon`}
            />
            {
              typeof playerScore.progress[progressKey] === "boolean"
              && (
                <input
                  className="progress-input"
                  onChange={() => changeToggleableScore(progressKey)}
                  checked={playerScore.progress[progressKey] as boolean}
                  type="checkbox"
                />
              )
            }
            {
              typeof playerScore.progress[progressKey] === "number"
              && (
                <div>
                  {
                    /**
                     * @todo Make this look nicer, and have an informational pop-up
                     * justifying this indicator
                     */
                    `3 x `
                  }
                  <input
                    className="progress-input"
                    onChange={(e) => changeNumericScore(progressKey, Number(e.target.value))}
                    value={playerScore.progress[progressKey] as number}
                    inputMode="numeric"
                  />
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  );
}

export default Progress;
