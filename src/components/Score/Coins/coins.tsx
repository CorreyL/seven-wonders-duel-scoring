import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import oneCoin from '/src/assets/one-coin.png';
import threeCoin from '/src/assets/three-coin.png';
import sixCoin from '/src/assets/six-coin.png';
import './coins.css';

function Coins() {
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const changeScore = (score: number, increment: boolean = false) => {
    setPlayerScore({
      ...playerScore,
      coins: (increment)
        ? playerScore.coins + score
        : score
    });
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => changeScore(Number(e.target.value))}
          value={playerScore.coins}
        />
      </div>
      <span onClick={() => changeScore(1, true)}>
        <img src={oneCoin} className="coin one-coin" alt="One Coin" />
      </span>
      <span onClick={() => changeScore(3, true)}>
        <img src={threeCoin} className="coin" alt="Three Coin" />
      </span>
      <span onClick={() => changeScore(6, true)}>
        <img src={sixCoin} className="coin six-coin" alt="Six Coin" />
      </span>
    </div>
  );
}

export default Coins;
