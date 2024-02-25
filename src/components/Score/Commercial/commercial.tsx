import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './commercial.css';

function Commercial() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const { commercial: commercialScore } = playerScore;

  const addCommercialCard = (score: number): void => {
    commercialScore[score] += 1;
    setPlayerScore({
      ...playerScore,
      commercial: commercialScore,
    });
  };

  const removeCommercialCard = (score: number): void => {
    commercialScore[score] -= 1;
    setPlayerScore({
      ...playerScore,
      commercial: commercialScore,
    });
  }

  return (
    <div className="commercial">
      <div className="total-commercial-points">
        {
          Object.keys(commercialScore).map((score) => (
            commercialScore[Number(score)] > 0
            && (
              [...Array(commercialScore[Number(score)])].map((_, idx) => (
                <button
                  key={`commercial-remove-btn-${score}-${idx}`}
                  onClick={() => removeCommercialCard(Number(score))}
                  className="commercial-btn"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-commercial-points">
        {
          Object.keys(commercialScore).map((score, idx) => (
            <button
              key={`commercial-btn-${idx}`}
              onClick={() => addCommercialCard(Number(score))}
              className="commercial-btn"
            >
              {score}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Commercial;
