import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './military.css';

function Military() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const { military } = playerScore

  return (
    <div className="military">
      Score From Military: {military}
    </div>
  );
}

export default Military;
