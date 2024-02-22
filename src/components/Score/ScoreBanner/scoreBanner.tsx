import './scoreBanner.css';
import Collapse from '../../../assets/collapse-icon.svg';
import Expand from '../../../assets/expand-icon.svg';

interface ScoreBannerProps {
  title: string;
  score: number;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function ScoreBanner({ title, score, expanded, setExpanded }: ScoreBannerProps) {
  return (
    <div
      onClick={() => (setExpanded(!expanded))}
      className="score-banner"
    >
      <span className="left-portion">
        <img
          className="toggle-icon"
          src={(expanded) ? Expand : Collapse}
        />
        {title}
      </span>
      <span>{score}</span>
    </div>
  );
}

export default ScoreBanner;
