import {
  useContext,
} from 'react';

import { OwnedWondersContext } from '../../context/Wonders';
import {
  WonderKeys,
} from '../../shared.types';

import './selectWonder.css';

interface SelectWonderProps {
  wonderKey: WonderKeys;
  wonderImage: string;
}

function SelectWonder({ wonderKey, wonderImage }: SelectWonderProps) {
  const {
    currentPlayer,
    ownedWonders,
    setOwnedWonders,
  } = useContext(OwnedWondersContext);

  const toggleWonder = (): void => {
    if (ownedWonders.has(wonderKey)) {
      ownedWonders.delete(wonderKey);
    } else {
      ownedWonders.add(wonderKey);
    }
    setOwnedWonders((prevOwnedWonders) => ({
      ...prevOwnedWonders,
      [currentPlayer]: ownedWonders,
    }));
  };

  return (
    <div className="select-wonder-container">
      <img
        src={wonderImage}
        alt={`${wonderKey}-wonder`}
        onClick={toggleWonder}
      />
      {
        ownedWonders.has(wonderKey)
        && <div className="overlay"></div>
      }
    </div>
  );
}

export default SelectWonder;
