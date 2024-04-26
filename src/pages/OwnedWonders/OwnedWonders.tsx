import { useContext } from 'react';
import {
  ActivatedExpansionsContext,
  OwnedWondersContext,
  PlayerScoringContext,
} from '../../context';
import WonderGrid from '../../components/WonderGrid';
import wonderKeyToImagePath from '../../assets/wonders/wonderKeyToImagePath';
import RaDivinity from '../../assets/pantheon-divinity/ra.webp';
import { WonderKeys } from '../../shared.types';
import './OwnedWonders.css';

function OwnedWonders() {
  const {
    activeExpansions,
  } = useContext(ActivatedExpansionsContext);

  const {
    currentPlayer,
    ownedWonders,
    setOwnedWonders,
  } = useContext(OwnedWondersContext);

  const {
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const maxWonders = (activeExpansions.pantheon && playerScore.divinity.ra) ? 5 : 4;

  const toggleWonder = (wonderKey: WonderKeys): void => {
    if (ownedWonders.has(wonderKey)) {
      ownedWonders.delete(wonderKey);
    } else if (
      !ownedWonders.has(wonderKey)
      && ownedWonders.size < maxWonders
    ) {
      ownedWonders.add(wonderKey);
    }
    setOwnedWonders((prevOwnedWonders) => ({
      ...prevOwnedWonders,
      [currentPlayer]: ownedWonders,
    }));
  };

  const changeMaxWonders = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPlayerScores((prevPlayerScore) => ({
      ...prevPlayerScore,
      [currentPlayer]: {
        ...prevPlayerScore[currentPlayer],
        divinity: {
          ...prevPlayerScore[currentPlayer].divinity,
          ra: !prevPlayerScore[currentPlayer].divinity.ra,
        },
      }
    }));
    // If the player de-selects Ra, then remove the last added Wonder
    if (!event.target.checked && ownedWonders.size > 4) {
      ownedWonders.delete(Array.from(ownedWonders).pop() as WonderKeys);
    }
  };

  return (
    <div>
      <div>Select the {maxWonders} wonders Player {currentPlayer} chose</div>
      {
        activeExpansions.pantheon
        && (
          <div className="flex flex-row flex-wrap justify-center items-center gap-6 p-6 m-6 divinity-selection">
            <img
              className="h-12"
              src={RaDivinity}
            />
            <input
              className="h-12 w-12"
              onChange={changeMaxWonders}
              checked={playerScore.divinity.ra as boolean}
              type="checkbox"
            />
          </div>
        )
      }

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
