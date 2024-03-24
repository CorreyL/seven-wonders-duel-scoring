import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';
import { GrandTempleScores } from '../../../shared.types';

import './grandTemple.css';

function GrandTemple() {
  const {
    currentPlayer,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const possibleScores = [0, 5, 12, 21] as Array<GrandTempleScores>;

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
      <div>
        {
          possibleScores.map(
            (score: GrandTempleScores, idx: number) => (
              <button
                key={`grand-temple-btn-${idx}`}
                onClick={() => setGrandTempleScore(score)}
              >
                {score}
              </button>
            )
          )
        }
      </div>
    </div>
  );
}

export default GrandTemple;
