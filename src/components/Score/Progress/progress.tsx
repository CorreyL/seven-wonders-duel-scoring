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
            <input
              onChange={() => changeToggleableScore(progressKey)}
              checked={playerScore.progress[progressKey] as boolean}
              type="checkbox"
            />
          </div>
        ))
      }
    </div>
  );
}

export default Progress;
