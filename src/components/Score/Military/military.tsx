import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';
import { MilitaryScores } from '../../../shared.types';

import './military.css';

function Military() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const possibleScores = [0, 2, 5, 10] as Array<MilitaryScores>;

  const setMilitaryScore = (score: MilitaryScores) => {
    setPlayerScore({
      ...playerScore,
      military: score,
    });
  };

  return (
    <div className="military">
      <div className="military-score-options">
        {
          possibleScores.map(
            (score: MilitaryScores, idx: number) => (
              <button
                key={`military-btn-${idx}`}
                className="military-btn"
                onClick={() => setMilitaryScore(score)}
              >
                {score}
              </button>
            )
          )
        }
      </div>
    </div>
  );
}

export default Military;
