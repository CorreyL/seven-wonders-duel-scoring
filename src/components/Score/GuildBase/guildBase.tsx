import {
  useContext,
} from 'react';
import CursorAgnosticInput from '../CursorAgnosticInput';
import { PlayerScoringContext } from '../../../context/Scoring';

import './guildBase.css';

import buildersGuildIcon from '/src/assets/guild-card-icons/builders-guild.webp';
import magistratesIcon from '/src/assets/guild-card-icons/magistrates-guild.webp';
import merchantsIcon from '/src/assets/guild-card-icons/merchants-guild.webp';
import moneylendersIcon from '/src/assets/guild-card-icons/moneylenders-guild.webp';
import scientistsIcon from '/src/assets/guild-card-icons/scientists-guild.webp';
import shipownersIcon from '/src/assets/guild-card-icons/shipowners-guild.webp';
import tacticiansIcon from '/src/assets/guild-card-icons/tacticians-guild.webp';

function GuildBase() {
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
              guildKey === 'builders'
              && '2x'
            }
            <CursorAgnosticInput
              onChange={(e) => changeScore(guildKey, Number(e.target.value))}
              score={guildScore[guildKey]}
            />
          </div>
        ))
      }
    </div>
  );
}

export default GuildBase;
