import {
  useContext,
} from 'react';

import { OwnedWondersContext } from '../../context/Wonders';

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
    <div>
    </div>
  );
}

export default SelectWonder;
