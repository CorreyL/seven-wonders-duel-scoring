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
      <div className="p-6 flex flex-wrap flex-row items-center gap-4 justify-flex-start min-h-24 bg-zinc-800">
        <span className="absolute m-auto left-0 right-0 opacity-50">Built Science Structures</span>
        {
          Object.keys(scienceScore).map((score) => (
            scienceScore[Number(score)] > 0
            && (
              [...Array(scienceScore[Number(score)])].map((_, idx) => (
                <button
                  key={`science-remove-btn-${score}-${idx}`}
                  onClick={() => removeScienceCard(Number(score))}
                  className="science-btn z-10"
                >
                  {score}
                </button>
              ))
            )
          ))
        }
      </div>
      <div className="add-science-points mt-4">
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
