import Agora from '/src/assets/boxart/agora.png';
import Base from '/src/assets/boxart/base.png';
import Pantheon from '/src/assets/boxart/pantheon.png';

import './expansions.css';

function Expansion() {
  return (
    <div>
      <img src={Base}/>
      <img className="disabled-expansion" src={Agora}/>
      <img src={Pantheon}/>
    </div>
  );
}

export default Expansion;
