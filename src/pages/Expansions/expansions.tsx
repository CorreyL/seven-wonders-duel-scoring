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
    <div className="expansions">
      <div>
        Select any applicable Expansions used for the game being scored
      </div>
      <img src={Base}/>
      <div className="select-expansion-container">
        <img
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
      <img className="disabled-expansion" src={Agora}/>
    </div>
  );
}

export default Expansion;
