import Aphrodite from '/src/assets/pantheon-divinity/aphrodite.png';
import Astarte from '/src/assets/pantheon-divinity/astarte.png';

import './divinity.css';

function Divinity() {
  return (
    <div>
      <div>
        <img src={Aphrodite}/>
      </div>
      <div className="divinity-selection">
        <img src={Astarte}/>
      </div>
    </div>
  );
}

export default Divinity;
