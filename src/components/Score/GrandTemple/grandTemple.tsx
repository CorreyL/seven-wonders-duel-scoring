import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';
import { GrandTempleScores } from '../../../shared.types';

import './grandTemple.css';

function GrandTemple() {
  const {
    currentPlayer,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const setGrandTempleScore = (score: GrandTempleScores) => {
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...prevPlayerScores[currentPlayer],
        grandTemple: score,
      }
    }));
  };

  return (
    <div>
    </div>
  );
}

export default GrandTemple;
