import {
  PlayerScores,
} from '../../shared.types';

import {
  calculateDistinctScoreTotal,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
} from '../../utils';

import './results.css';

interface ResultsProps {
  playerScores: PlayerScores;
}

function Results({ playerScores }: ResultsProps) {
  const keyToScoringMethodMapping = {
    civilian: calculateDistinctScoreTotal,
    coins: calculateCoinsTotal,
    commercial: calculateDistinctScoreTotal,
    guildBase: calculateGuildBaseTotal,
    military: (value: number) => (value),
    progress: calculateProgressTokensTotal,
    science: calculateDistinctScoreTotal,
    wonders: calculateWonderTotal,
  };

  const keyToRowTitle = {
    guildBase: 'Guild',
  };

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div>
    </div>
  );
}

export default Results;