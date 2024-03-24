import {
  useContext,
} from 'react';

import { ActivatedExpansionsContext } from '../../context';

import Agora from '/src/assets/boxart/agora.png';
import Base from '/src/assets/boxart/base.png';
import Pantheon from '/src/assets/boxart/pantheon.png';
import PlusSymbol from '/src/assets/plus-symbol.png';

import './expansions.css';

function Expansion() {
  const {
    activeExpansions,
    setActiveExpansions,
  } = useContext(ActivatedExpansionsContext);

  return (
    <div className="expansion-selection">
      <div>
        Select any applicable Expansions used for the game being scored
      </div>
      <div>
        Expansions Selected:
        {
          (!activeExpansions.pantheon && !activeExpansions.agora)
          && <span> None</span>
        }
        {
          (activeExpansions.pantheon && !activeExpansions.agora)
          && <span> Pantheon</span>
        }
        {
          (activeExpansions.pantheon && activeExpansions.agora)
          && <span> Pantheon + Agora</span>
        }
      </div>
      <img className="base-game-image" src={Base}/>
      <img src={PlusSymbol}/>
      <div className="expansions">
        <div className="select-expansion-container">
          {
            /**
             * @todo If Wonders or Scoring has been started, reset all
             * selections and scoring if expansions change, to ensure the app
             * does not fall into a state where, for example, the Pantheon
             * specific Wonder is selected, but then the user has subsequently
             * de-selected the Pantheon expansion
             */
          }
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
