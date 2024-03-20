import {
  useContext,
} from 'react';

import { ActivatedExpansionsContext } from '../../context';

import Agora from '/src/assets/boxart/agora.png';
import Base from '/src/assets/boxart/base.png';
import Pantheon from '/src/assets/boxart/pantheon.png';

import './expansions.css';

function Expansion() {
  const {
    activeExpansions,
    setActiveExpansions,
  } = useContext(ActivatedExpansionsContext);

  return (
    <div>
      <div>
        Select any applicable Expansions used for the game being scored
      </div>
      <img className="base-game-image" src={Base}/>
      <div className="expansions">
        <div className="select-expansion-container">
          <img
            className="expansion-image"
            onClick={() => {setActiveExpansions((prevActiveExpansions) => ({
              ...prevActiveExpansions,
              pantheon: !prevActiveExpansions.pantheon,
            }))}}
            src={Pantheon}
          />
          {
            activeExpansions.pantheon
            && <div className="overlay"></div>
          }
        </div>
        <img className="expansion-image disabled-expansion" src={Agora}/>
      </div>
    </div>
  );
}

export default Expansion;
