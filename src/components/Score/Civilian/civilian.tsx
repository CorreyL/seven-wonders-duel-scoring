import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './civilian.css';

function Civilian() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const { civilian: civilianScore } = playerScore;

  const addCivilianCard = (score: number): void => {
    civilianScore[score] += 1;
    setPlayerScore({
      ...playerScore,
      civilian: civilianScore,
    });
  };

  const removeCivilianCard = (score: number): void => {
    civilianScore[score] -= 1;
    setPlayerScore({
      ...playerScore,
      civilian: civilianScore,
    });
  }

  return (
    <div className="civilian">
      <div className="total-civilian-points">
        {
          Object.keys(civilianScore).map((score) => (
            civilianScore[Number(score)] > 0
            && (
              [...Array(civilianScore[Number(score)])].map((_, idx) => (
                <button
                  key={`civilian-remove-btn-${score}-${idx}`}
                  onClick={() => removeCivilianCard(Number(score))}
                  className="civilian-btn"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-civilian-points">
        {
          Object.keys(civilianScore).map((score, idx) => (
            <button
              key={`civilian-btn-${idx}`}
              onClick={() => addCivilianCard(Number(score))}
              className="civilian-btn"
            >
              {score}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Civilian;