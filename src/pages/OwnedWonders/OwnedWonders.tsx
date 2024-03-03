import WonderGrid from '../../components/WonderGrid';
import wonderKeyToImagePath from '../../assets/wonders/wonderKeyToImagePath';
import { WonderKeys } from '../../shared.types';
import './OwnedWonders.css';

function OwnedWonders() {
  return (
    <div>
      <WonderGrid
        wondersToRender={new Set(
          Object.keys(wonderKeyToImagePath) as Array<WonderKeys>
        )}
      />
    </div>
  );
}

export default OwnedWonders;
