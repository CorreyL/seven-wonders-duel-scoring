import './scoreBanner.css';
// import Collapse from '../../../assets/collapse-icon.svg';
import Expand from '../../../assets/expand-icon.svg';

interface ScoreBannerProps {
  title: string;
  score: number;
}

function ScoreBanner({ title, score }: ScoreBannerProps) {
  return (
    <div className="score-banner">
      <span className="left-portion">
        <img
          className="toggle-icon"
          src={Expand}
        />
        {title}
      </span>
      <span>{score}</span>
    </div>
  );
}

export default ScoreBanner;
