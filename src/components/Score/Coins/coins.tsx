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
        <p>Score From Coins: {Math.floor(playerScore.coins / 3)}</p>
        <input
          onChange={(e) => changeScore(Number(e.target.value))}
          value={playerScore.coins}
        />
      </div>
      <img
        onClick={() => changeScore(1, true)}
        src={oneCoin}
        className="coin one-coin"
        alt="One Coin"
      />
      <img
        onClick={() => changeScore(3, true)}
        src={threeCoin}
        className="coin"
        alt="Three Coin"
      />
      <img
        onClick={() => changeScore(6, true)}
        src={sixCoin}
        className="coin six-coin"
        alt="Six Coin"
      />
    </div>
  );
}

export default Coins;
