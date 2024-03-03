import { useContext } from 'react';
import { WonderKeys } from '../../../shared.types';
import { OwnedWondersContext, PlayerScoringContext } from '../../../context';

import WonderGrid from '../../WonderGrid';
import './wonder.css';

function Wonder() {
  const {
    ownedWonders,
  } = useContext(OwnedWondersContext);

  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const toggleWonder = (wonderKey: WonderKeys): void => {
    if (playerScore.wonders.has(wonderKey)) {
      playerScore.wonders.delete(wonderKey);
    } else {
      playerScore.wonders.add(wonderKey);
    }
    setPlayerScores((prevPlayerScore) => ({
      ...prevPlayerScore,
      [currentPlayer]: {
        ...playerScore,
      }
    }));
  };

  return (
    <div>
      <WonderGrid
        wondersToRender={ownedWonders}
        selectWonder={toggleWonder}
        wonderSet={playerScore.wonders}
      />
    </div>
  );
}

export default Wonder;
