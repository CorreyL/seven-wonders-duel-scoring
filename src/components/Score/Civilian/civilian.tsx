import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

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
    <div>
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
  );
}

export default Civilian;