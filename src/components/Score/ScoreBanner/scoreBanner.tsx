import './scoreBanner.css';

interface ScoreBannerProps {
  title: string;
  score: number;
}

function ScoreBanner({ title, score }: ScoreBannerProps) {
  return (
    <div className="score-banner">
      <span>{title}</span>
      <span>{score}</span>
    </div>
  );
}

export default ScoreBanner;
