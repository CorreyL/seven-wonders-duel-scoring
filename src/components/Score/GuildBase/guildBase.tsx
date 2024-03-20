import {
  useContext,
  useState,
} from 'react';
import { PlayerScoringContext } from '../../../context/Scoring';

import './guildBase.css';

import buildersGuildIcon from '/src/assets/guild-card-icons/builders-guild.png';
import magistratesIcon from '/src/assets/guild-card-icons/magistrates-guild.png';
import merchantsIcon from '/src/assets/guild-card-icons/merchants-guild.png';
import moneylendersIcon from '/src/assets/guild-card-icons/moneylenders-guild.png';
import scientistsIcon from '/src/assets/guild-card-icons/scientists-guild.png';
import shipownersIcon from '/src/assets/guild-card-icons/shipowners-guild.png';
import tacticiansIcon from '/src/assets/guild-card-icons/tacticians-guild.png';

function GuildBase() {
  const [ firstInput, setFirstInput ] = useState(true);

  const {
    currentPlayer,
    playerScore,
    setPlayerScores,
  } = useContext(PlayerScoringContext);

  const { guildBase: guildScore } = playerScore;

  const changeScore = (guildKey: string, score: number): void => {
    setPlayerScores((prevPlayerScores) => ({
      ...prevPlayerScores,
      [currentPlayer]: {
        ...playerScore,
        guildBase: {
          ...playerScore.guildBase,
          [guildKey]: score,
        },
      }
    }));
  };

  const guildToIconMapping = {
    /**
     * Ordered non-alphabetically intentionally, to instead render the guild
     * cards that behave similarly (i.e. X Victory Points for each Y type of
     * card)
     */
    magistrates: merchantsIcon,
    moneylenders: magistratesIcon,
    scientists: scientistsIcon,
    shipowners: shipownersIcon,
    tactician: tacticiansIcon,

    builders: buildersGuildIcon,
    merchants: moneylendersIcon,
  };

  return (
    <div className="guild-base-container">
      {
        Object.keys(guildToIconMapping).map((guildKey: string) => (
          <div
            className="guild-score-container"
            key={`${guildKey}-guild-score`}
          >
            <img
              className={`guild-icon ${(guildKey === 'builders') ? "builder-guild-icon" : ""}`}
              src={guildToIconMapping[guildKey as keyof typeof guildToIconMapping]}
              alt={`${guildKey}-guild-icon`}
            />
            {
              /**
               * @todo A similar input is needed in the Progress component
               *
               * Spin this out into its own component, and use it in both
               * components
               */
            }
            {
              guildKey === 'builders'
              && '2x'
            }
            <input
              inputMode="numeric"
              onFocus={() => {
                setFirstInput(true);
              }}
              onChange={(e) => {
                // @ts-expect-error e.nativeEvent does in-fact have a data key
                const keyPressed = e.nativeEvent.data;
                if (isNaN(Number(keyPressed))) {
                  return;
                }
                // Doing a truthy check on keyPressed because backspace results
                // in keyPressed being assigned to null, which will ultimately
                // make the score a NaN if not checked
                if (firstInput && keyPressed) {
                  e.target.value = String(keyPressed);
                  setFirstInput(false);
                }
                changeScore(guildKey, Number(e.target.value));
              }}
              onBlur={() => {
                setFirstInput(true);
              }}
              value={guildScore[guildKey]}
            />
          </div>
        ))
      }
    </div>
  );
}

export default GuildBase;
