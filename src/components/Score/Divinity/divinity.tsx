import {
  useContext,
} from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import Aphrodite from '/src/assets/pantheon-divinity/aphrodite.png';
import Astarte from '/src/assets/pantheon-divinity/astarte.png';

import './divinity.css';

function Divinity() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const changeAphroditeScore = () => {
    setPlayerScores((prevPlayerScore) => ({
      ...prevPlayerScore,
      [currentPlayer]: {
        ...prevPlayerScore[currentPlayer],
        divinity: {
          ...prevPlayerScore[currentPlayer].divinity,
          aphrodite: !prevPlayerScore[currentPlayer].divinity.aphrodite,
        },
      }
    }));
  };

  const changeAstarteScore = (score: number) => {
    setPlayerScores((prevPlayerScore) => ({
      ...prevPlayerScore,
      [currentPlayer]: {
        ...prevPlayerScore[currentPlayer],
        divinity: {
          ...prevPlayerScore[currentPlayer].divinity,
          astarte: score,
        },
      }
    }));
  };

  return (
    <div>
      <div>
        <img src={Aphrodite}/>
        <input
          onChange={changeAphroditeScore}
          checked={playerScore.divinity.aphrodite as boolean}
          type="checkbox"
        />
      </div>
      <div className="divinity-selection">
        <img src={Astarte}/>
        <input
          onChange={(e) => changeAstarteScore(Number(e.target.value))}
          value={playerScore.divinity.astarte}
          inputMode="numeric"
        />
      </div>
    </div>
  );
}

export default Divinity;
