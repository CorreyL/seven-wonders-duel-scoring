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
    civilianScore.push(score);
    setPlayerScore({
      ...playerScore,
      civilian: civilianScore,
    })
  };

  const civilianCardScores = [3, 4, 5, 6, 7];

  return (
    <div className="civilian">
      <p>
        Score from Civilian: {
          civilianScore.reduce(
            (partialSum: number, num: number) => (partialSum + num),
            0,
          )
        }
      </p>
      <div className="add-civilian-points">
        {
          civilianCardScores.map((score, idx) => (
            <button
              key={`civilian-btn-${idx}`}
              onClick={() => addCivilianCard(score)}
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