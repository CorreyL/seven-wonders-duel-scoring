import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

function Civilian() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  return (
    <div>
      Hello World
    </div>
  );
}

export default Civilian;