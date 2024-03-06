import { useContext } from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import oneCoin from '/src/assets/one-coin.png';
import threeCoin from '/src/assets/three-coin.png';
import sixCoin from '/src/assets/six-coin.png';
import './coins.css';

function Coins() {
  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const changeScore = (score: number, increment: boolean = false) => {
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        coins: (increment)
          ? playerScore.coins + score
          : score
      }
    }));
  };

  return (
    <div>
      <div>
        <input
          type="search"
          inputMode="numeric"
          className="coins-input"
          onChange={(e) => changeScore(Number(e.target.value))}
          value={playerScore.coins}
        />
        {
          /**
           * @todo Make this look nicer, and have an informational pop-up
           * justifying this indicator
           */
          ` / 3`
        }
      </div>
      <div className="coin-buttons">
        <img
          onClick={() => changeScore(1, true)}
          src={oneCoin}
          className="coin one-coin"
          alt="One Coin"
        />
        <img
          onClick={() => changeScore(3, true)}
          src={threeCoin}
          className="coin three-coin"
          alt="Three Coin"
        />
        <img
          onClick={() => changeScore(6, true)}
          src={sixCoin}
          className="coin six-coin"
          alt="Six Coin"
        />
      </div>
    </div>
  );
}

export default Coins;
