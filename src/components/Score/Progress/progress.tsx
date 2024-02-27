import './progress.css';

import Agriculture from '/src/assets/progress-tokens/agriculture.png';
import Mathematics from '/src/assets/progress-tokens/mathematics.png';
import Philosophy from '/src/assets/progress-tokens/philosophy.png';

function Progress() {
  const mapProgressKeysToIcons = {
    agriculture: Agriculture,
    philosophy: Philosophy,
    mathematics: Mathematics,
  };

  return (
    <div>
      {
        Object.keys(mapProgressKeysToIcons).map((progressKey) => (
          <div
            key={`${progressKey}-icon`}
          >
            <img
              src={mapProgressKeysToIcons[progressKey as keyof typeof mapProgressKeysToIcons]}
              alt={`${progressKey} Progress Token Icon`}
            />
          </div>
        ))
      }
    </div>
  );
}

export default Progress;
