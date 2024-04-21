import {
  useContext,
} from 'react';

import { ActivatedExpansionsContext } from '../../context';

import Agora from '/src/assets/boxart/agora.webp';
import Base from '/src/assets/boxart/base.webp';
import Pantheon from '/src/assets/boxart/pantheon.webp';
import PlusSymbol from '/src/assets/plus-symbol.webp';

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
      <div className="flex flex-row gap-2">
        <div className="select-expansion-container flex-1 w-5/12">
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
        <div className="select-expansion-container flex-1 w-5/12">
          <img className="disabled-expansion flex-1" src={Agora}/>
        </div>
      </div>
    </div>
  );
}

export default Expansion;
