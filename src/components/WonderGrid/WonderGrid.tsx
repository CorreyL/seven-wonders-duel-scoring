import { useContext } from 'react';
import { WonderKeys } from '../../shared.types';
import { ActivatedExpansionsContext } from '../../context';
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
  const {
    activeExpansions,
  } = useContext(ActivatedExpansionsContext);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-2">
      {
        Array.from(wondersToRender.values()).map((wonderKey, idx) => {
          if (
            wonderKey === 'divineTheater' as WonderKeys
            && !activeExpansions.pantheon
          ) {
            return null;
          }
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
