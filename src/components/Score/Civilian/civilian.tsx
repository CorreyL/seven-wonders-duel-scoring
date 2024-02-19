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

  return (
    <div className="civilian">
      <p>
        Score from Civilian: {
          Object.keys(civilianScore).reduce(
            (partialSum: number, key: string) => (
              (civilianScore[Number(key)] * Number(key)) + partialSum
            ),
            0,
          )
        }
      </p>
      <div className="add-civilian-points">
        {
          Object.keys(civilianScore).map((score, idx) => (
            <button
              key={`civilian-btn-${idx}`}
              onClick={() => addCivilianCard(Number(score))}
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