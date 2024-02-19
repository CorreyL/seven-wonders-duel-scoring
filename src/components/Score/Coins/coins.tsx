import oneCoin from '/src/assets/one-coin.png';
import threeCoin from '/src/assets/three-coin.png';
import sixCoin from '/src/assets/six-coin.png';
import './coins.css';

function Coins() {
  return (
    <>
      <span>
        <img src={oneCoin} className="coin one-coin" alt="One Coin" />
      </span>
      <span>
        <img src={threeCoin} className="coin" alt="Three Coin" />
      </span>
      <span>
        <img src={sixCoin} className="coin six-coin" alt="Six Coin" />
      </span>
    </>
  );
}

export default Coins;
