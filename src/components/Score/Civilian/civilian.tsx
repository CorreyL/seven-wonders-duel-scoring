import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './civilian.css';

function Civilian() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const { civilian: civilianScore } = playerScore;

  const addCivilianCard = (score: number): void => {
    civilianScore[score] += 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        civilian: civilianScore,
      },
    }));
  };

  const removeCivilianCard = (score: number): void => {
    civilianScore[score] -= 1;
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        civilian: civilianScore,
      },
    }));
  }

  return (
    <div className="civilian">
      <div className="px-6 flex flex-wrap flex-row align-center gap-4 justify-flex-start min-h-16">
        {
          Object.keys(civilianScore).map((score) => (
            civilianScore[Number(score)] > 0
            && (
              [...Array(civilianScore[Number(score)])].map((_, idx) => (
                <button
                  key={`civilian-remove-btn-${score}-${idx}`}
                  onClick={() => removeCivilianCard(Number(score))}
                  className="civilian-btn h-12"
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