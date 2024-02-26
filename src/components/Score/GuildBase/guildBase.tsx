import { useContext } from 'react';
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
  const {
    playerScore,
    setPlayerScore,
  } = useContext(PlayerScoringContext);

  const { guildBase: guildScore } = playerScore;

  const changeScore = (guildKey: string, score: number): void => {
    setPlayerScore({
      ...playerScore,
      guildBase: {
        ...playerScore.guildBase,
        [guildKey]: score,
      }
    });
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
    <div>
      {
        Object.keys(guildToIconMapping).map((guildKey: string) => (
          <div
            key={`${guildKey}-guild-score`}
          >
            <img
              className="guild-icon"
              src={guildToIconMapping[guildKey as keyof typeof guildToIconMapping]}
              alt={`${guildKey}-guild-icon`}
            />
            <input
              type="search"
              inputMode="numeric"
              onChange={(e) => changeScore(guildKey, Number(e.target.value))}
              value={guildScore[guildKey]}
            />
          </div>
        ))
      }
    </div>
  );
}

export default GuildBase;
