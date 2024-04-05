import {
  useContext,
} from 'react';
import {
  ActivatedExpansionsContext,
  PlayerScoringContext,
} from '../../../context';

import './progress.css';

import Agriculture from '/src/assets/progress-tokens/agriculture.webp';
import Mathematics from '/src/assets/progress-tokens/mathematics.webp';
import Mysticism from '/src/assets/progress-tokens/mysticism.webp';
import Philosophy from '/src/assets/progress-tokens/philosophy.webp';

function Progress() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const {
    activeExpansions,
  } = useContext(ActivatedExpansionsContext);

  const mapProgressKeysToIcons = {
    agriculture: Agriculture,
    philosophy: Philosophy,
    mathematics: Mathematics,
    mysticism: Mysticism,
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

  const progressTokenNumericMultiplier = {
    mathematics: 3,
    mysticism: 2,
  };

  return (
    <div className="progress-score">
      {
        Object.keys(mapProgressKeysToIcons).map((progressKey) => {
          if (
            progressKey === 'mysticism'
            && !activeExpansions.pantheon
          ) {
            return null;
          }
          return (<div
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
                    `${progressTokenNumericMultiplier[progressKey as keyof typeof progressTokenNumericMultiplier]} x `
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
        )})
      }
    </div>
  );
}

export default Progress;
