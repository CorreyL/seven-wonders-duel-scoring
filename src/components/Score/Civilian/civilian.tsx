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
      <div className="p-6 flex flex-wrap flex-row items-center gap-4 justify-flex-start min-h-24 bg-zinc-800 rounded-lg">
        <span className="absolute m-auto left-0 right-0 opacity-50">Built Civilian Structures</span>
        {
          Object.keys(civilianScore).map((score) => (
            civilianScore[Number(score)] > 0
            && (
              [...Array(civilianScore[Number(score)])].map((_, idx) => (
                <button
                  key={`civilian-remove-btn-${score}-${idx}`}
                  onClick={() => removeCivilianCard(Number(score))}
                  className="civilian-btn h-12 z-10"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-civilian-points mt-4">
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