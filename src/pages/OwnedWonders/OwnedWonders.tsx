import { useContext } from 'react';
import { OwnedWondersContext } from '../../context';
import WonderGrid from '../../components/WonderGrid';
import wonderKeyToImagePath from '../../assets/wonders/wonderKeyToImagePath';
import RaDivinity from '../../assets/pantheon-divinity/ra.webp';
import { WonderKeys } from '../../shared.types';
import './OwnedWonders.css';

function OwnedWonders() {
  const {
    currentPlayer,
    ownedWonders,
    setOwnedWonders,
  } = useContext(OwnedWondersContext);

  const toggleWonder = (wonderKey: WonderKeys): void => {
    if (ownedWonders.has(wonderKey)) {
      ownedWonders.delete(wonderKey);
    } else if (
      !ownedWonders.has(wonderKey)
      && ownedWonders.size < 4
    ) {
      ownedWonders.add(wonderKey);
    }
    setOwnedWonders((prevOwnedWonders) => ({
      ...prevOwnedWonders,
      [currentPlayer]: ownedWonders,
    }));
  };

  return (
    <div>
      <div>Select the 4 wonders Player {currentPlayer} chose</div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-6 p-6 m-6 divinity-selection">
        <img
          className="h-12"
          src={RaDivinity}
        />
        <input
          className="h-12 w-12"
          type="checkbox"
        />
      </div>
      <WonderGrid
        wondersToRender={new Set(
          Object.keys(wonderKeyToImagePath) as Array<WonderKeys>
        )}
        selectWonder={toggleWonder}
        wonderSet={ownedWonders}
      />
    </div>
  );
}

export default OwnedWonders;
