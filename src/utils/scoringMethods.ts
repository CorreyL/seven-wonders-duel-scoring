import {
  DistinctScores,
  DivinityScores,
  GuildBaseScores,
  Player,
  PlayerScores,
  ProgressScores,
  WonderKeys,
} from '../shared.types';

const calculateDistinctScoreTotal = (distinctScores: DistinctScores): number => {
  return Object.keys(distinctScores).reduce(
    (partialSum: number, key: string) => (
      (distinctScores[Number(key)] * Number(key)) + partialSum
    ),
    0,
  );
};

const calculateCoinsTotal = (coins: number): number => {
  return Math.floor(coins / 3)
};

const calculateDivinityScores = (divinity: DivinityScores) => {
  const {
    aphrodite,
    astarte,
  } = divinity;

  // aphrodite is a boolean value, and is worth 9 points if scored
  return Number(aphrodite) * 9 + astarte;
};

const calculateGuildBaseTotal = (guildBaseScores: GuildBaseScores): number => {
  return Object.keys(guildBaseScores).reduce(
    (partialSum: number, key: string) => (
      (key === 'builders')
        ? (guildBaseScores[key] * 2) + partialSum
        : (guildBaseScores[key]) + partialSum
    ),
    0,
  );
};

const calculateProgressTokensTotal = (progress: ProgressScores): number => {
  const {
    agriculture,
    mathematics,
    philosophy,
  } = progress
  return (
    4 * Number(agriculture)
    + 3 * mathematics
    + 7 * Number(philosophy)
  );
};

const calculateWonderTotal = (wonders: Set<WonderKeys>): number => {
  const wonderKeyToValueMap = {
    appianWay: 3,
    circusMaximus: 3,
    colossus: 3,
    greatLibrary: 4,
    greatLighthouse: 4,
    hangingGardens: 3,
    mausoleum: 2,
    piraeus: 2,
    pyramids: 9,
    sphinx: 6,
    statueOfZeus: 3,
    templeOfArtemis: 0,
  };
  return (
    Array
      .from(wonders)
      .reduce(
        (prevScore, wonderKey) => (
          prevScore + wonderKeyToValueMap[wonderKey]
        ),
        0,
      )
  );
};

const calculateTotalScore = (playerScores: PlayerScores, currentPlayer: Player): number => {
  return (
    calculateDistinctScoreTotal(playerScores[currentPlayer].civilian)
    + calculateCoinsTotal(playerScores[currentPlayer].coins)
    + playerScores[currentPlayer].military
    + calculateDistinctScoreTotal(playerScores[currentPlayer].science)
    + calculateDistinctScoreTotal(playerScores[currentPlayer].commercial)
    + calculateDivinityScores(playerScores[currentPlayer].divinity)
    + calculateGuildBaseTotal(playerScores[currentPlayer].guildBase)
    + calculateProgressTokensTotal(playerScores[currentPlayer].progress)
    + calculateWonderTotal(playerScores[currentPlayer].wonders)
  );
};

export {
  calculateDistinctScoreTotal,
  calculateDivinityScores,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
};