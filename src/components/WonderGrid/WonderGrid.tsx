import { WonderKeys } from '../../shared.types';
import './WonderGrid.css';

interface WonderGridProps {
  wondersToRender: Set<WonderKeys>;
}

function WonderGrid({ wondersToRender }: WonderGridProps) {
  return (
    <div className="wonder-grid">
    </div>
  );
}

export default WonderGrid;
