import {
  useContext,
} from 'react';
import CursorAgnosticInput from '../CursorAgnosticInput';
import { PlayerScoringContext } from '../../../context/Scoring';

import Aphrodite from '/src/assets/pantheon-divinity/aphrodite.webp';
import Astarte from '/src/assets/pantheon-divinity/astarte.webp';

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
    <div className="divinity">
      <div className="divinity-selection">
        <img src={Aphrodite}/>
        <input
          className="divinity-input"
          onChange={changeAphroditeScore}
          checked={playerScore.divinity.aphrodite as boolean}
          type="checkbox"
        />
      </div>
      <div className="divinity-selection">
        <img src={Astarte}/>
        <CursorAgnosticInput
          className="divinity-input"
          onChange={(e) => changeAstarteScore(Number(e.target.value))}
          score={playerScore.divinity.astarte}
        />
      </div>
    </div>
  );
}

export default Divinity;
