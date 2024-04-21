import {
  WonderKeys,
} from '../../shared.types';

import './selectWonder.css';

interface SelectWonderProps {
  selectWonder: (wonderKey: WonderKeys) => void;
  wonderSet: Set<WonderKeys>;
  wonderKey: WonderKeys;
  wonderImage: string;
}

function SelectWonder({
  selectWonder,
  wonderKey,
  wonderImage,
  wonderSet,
}: SelectWonderProps) {
  return (
    <div className="select-wonder-container w-1/2">
      <img
        src={wonderImage}
        alt={`${wonderKey}-wonder`}
        onClick={() => {
          selectWonder(wonderKey);
        }}
        draggable={false}
      />
      {
        wonderSet.has(wonderKey)
        && <div className="overlay"></div>
      }
    </div>
  );
}

export default SelectWonder;
