import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './commercial.css';

function Commercial() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const { commercial: commercialScore } = playerScore;

  const addCommercialCard = (score: number): void => {
    commercialScore[score] += 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        commercial: commercialScore,
      },
    }));
  };

  const removeCommercialCard = (score: number): void => {
    commercialScore[score] -= 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        commercial: commercialScore,
      },
    }));
  }

  return (
    <div className="commercial">
      <div className="p-6 flex flex-wrap flex-row items-center gap-4 justify-flex-start min-h-24 bg-zinc-800">
        <span className="absolute m-auto left-0 right-0 opacity-50">Built Commercial Structures</span>
        {
          Object.keys(commercialScore).map((score) => (
            commercialScore[Number(score)] > 0
            && (
              [...Array(commercialScore[Number(score)])].map((_, idx) => (
                <button
                  key={`commercial-remove-btn-${score}-${idx}`}
                  onClick={() => removeCommercialCard(Number(score))}
                  className="commercial-btn z-10"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-commercial-points mt-4">
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
