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
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const mapProgressKeysToIcons = {
    agriculture: Agriculture,
    philosophy: Philosophy,
    mathematics: Mathematics,
  };

  const changeToggleableScore = (progressKey: string): void => {
    setPlayerScore({
      ...playerScore,
      progress: {
        ...playerScore.progress,
        [progressKey]: !playerScore.progress[progressKey],
      },
    });
  };

  const changeNumericScore = (progressKey: string, score: number): void => {
    setPlayerScore({
      ...playerScore,
      progress: {
        ...playerScore.progress,
        [progressKey]: score,
      },
    });
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
                  onChange={() => changeToggleableScore(progressKey)}
                  checked={playerScore.progress[progressKey] as boolean}
                  type="checkbox"
                />
              )
            }
            {
              typeof playerScore.progress[progressKey] === "number"
              && (
                <input
                  onChange={(e) => changeNumericScore(progressKey, Number(e.target.value))}
                  value={playerScore.progress[progressKey] as number}
                  inputMode="numeric"
                />
              )
            }
          </div>
        ))
      }
    </div>
  );
}

export default Progress;
