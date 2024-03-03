import { useContext } from 'react';
import { OwnedWondersContext } from '../../context';
import WonderGrid from '../../components/WonderGrid';
import wonderKeyToImagePath from '../../assets/wonders/wonderKeyToImagePath';
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
