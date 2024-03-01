import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './science.css';

function Science() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const { science: scienceScore } = playerScore;

  const addScienceCard = (score: number): void => {
    scienceScore[score] += 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        science: scienceScore,
      },
    }));
  };

  const removeScienceCard = (score: number): void => {
    scienceScore[score] -= 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        science: scienceScore,
      },
    }));
  }

  return (
    <div className="science">
      <div className="total-science-points">
        {
          Object.keys(scienceScore).map((score) => (
            scienceScore[Number(score)] > 0
            && (
              [...Array(scienceScore[Number(score)])].map((_, idx) => (
                <button
                  key={`science-remove-btn-${score}-${idx}`}
                  onClick={() => removeScienceCard(Number(score))}
                  className="science-btn"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-science-points">
        {
          Object.keys(scienceScore).map((score, idx) => (
            <button
              key={`science-btn-${idx}`}
              onClick={() => addScienceCard(Number(score))}
              className="science-btn"
            >
              {score}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Science;
