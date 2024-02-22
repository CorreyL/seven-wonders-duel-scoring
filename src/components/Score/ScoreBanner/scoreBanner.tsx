interface ScoreBannerProps {
  title: string;
  score: number;
}

export default function ScoreBanner({ title, score }: ScoreBannerProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{score}</span>
    </div>
  );
}
