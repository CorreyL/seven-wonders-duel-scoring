const getImageUrl = (imageName: string) => new URL(imageName, import.meta.url).href;

export default {
  appianWay: getImageUrl('appianWay.png'),
  circusMaximus: getImageUrl('circusMaximus.png'),
  colossus: getImageUrl('colossus.png'),
  greatLibrary: getImageUrl('greatLibrary.png'),
  greatLighthouse: getImageUrl('greatLighthouse.png'),
  hangingGardens: getImageUrl('hangingGardens.png'),
  mausoleum: getImageUrl('mausoleum.png'),
  piraeus: getImageUrl('piraeus.png'),
  pyramids: getImageUrl('pyramids.png'),
  sphinx: getImageUrl('sphinx.png'),
  statueOfZeus: getImageUrl('statueOfZeus.png'),
  templeOfArtemis: getImageUrl('templeOfArtemis.png'),
};
