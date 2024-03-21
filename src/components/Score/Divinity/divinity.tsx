import {
  useContext,
} from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import Aphrodite from '/src/assets/pantheon-divinity/aphrodite.png';
import Astarte from '/src/assets/pantheon-divinity/astarte.png';

import './divinity.css';

function Divinity() {
  const {
    playerScore,
  } = useContext(PlayerScoringContext);

  return (
    <div>
      <div>
        <img src={Aphrodite}/>
        <input
          checked={playerScore.divinity.aphrodite}
          type="checkbox"
        />
      </div>
      <div className="divinity-selection">
        <img src={Astarte}/>
        <input
          value={playerScore.divinity.astarte}
          inputMode="numeric"
        />
      </div>
    </div>
  );
}

export default Divinity;
