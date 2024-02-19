import oneCoin from '/src/assets/one-coin.png';
import threeCoin from '/src/assets/three-coin.png';
import sixCoin from '/src/assets/six-coin.png';

function Coins() {
  return (
    <>
      <span>
        <img src={oneCoin} alt="One Coin" />
      </span>
      <span>
        <img src={threeCoin} alt="Three Coin" />
      </span>
      <span>
        <img src={sixCoin} alt="Six Coin" />
      </span>
    </>
  );
}

export default Coins;
