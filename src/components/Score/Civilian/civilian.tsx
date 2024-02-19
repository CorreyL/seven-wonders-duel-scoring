import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

function Civilian() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const civilianCardScores = [3, 4, 5, 6, 7];

  return (
    <div>
      {
        civilianCardScores.map((score, idx) => (
          <button key={`civilian-btn-${idx}`}>{score}</button>
        ))
      }
    </div>
  );
}

export default Civilian;