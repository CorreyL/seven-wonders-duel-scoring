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
      {
        /**
         * @todo Prevent user from switching to the Scoring page until they've
         * selected 4 wonders for the current player
         */
        ownedWonders.size < 4
        && (
          <div>
            ⚠️ Please go back to the previous page and select the 4 wonders
            Player {currentPlayer} selected at the beginning of the game ⚠️
          </div>
        )
      }
      <WonderGrid
        wondersToRender={ownedWonders}
        selectWonder={toggleWonder}
        wonderSet={playerScore.wonders}
      />
    </div>
  );
}

export default Wonder;
