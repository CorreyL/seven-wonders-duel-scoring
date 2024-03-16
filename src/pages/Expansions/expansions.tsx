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
      <img src={Base}/>
      <img className="disabled-expansion" src={Agora}/>
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
    </div>
  );
}

export default Expansion;
