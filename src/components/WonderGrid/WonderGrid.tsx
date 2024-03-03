import { WonderKeys } from '../../shared.types';
import SelectWonder from '../SelectWonder';
import wonderKeyToImagePath from '../../assets/wonders/wonderKeyToImagePath';
import './WonderGrid.css';

interface WonderGridProps {
  selectWonder: (wonderKey: WonderKeys) => void;
  wonderSet: Set<WonderKeys>;
  wondersToRender: Set<WonderKeys>;
}

function WonderGrid({
  selectWonder,
  wonderSet,
  wondersToRender
}: WonderGridProps) {
  return (
    <div className="wonder-grid">
      {
        Array.from(wondersToRender.values()).map((wonderKey, idx) => {
          return (
            <SelectWonder
              key={`select-wonder-${wonderKey}-${idx}`}
              selectWonder={selectWonder}
              wonderSet={wonderSet}
              wonderKey={wonderKey}
              wonderImage={wonderKeyToImagePath[wonderKey]}
            />
          )
        })
      }
    </div>
  );
}

export default WonderGrid;
