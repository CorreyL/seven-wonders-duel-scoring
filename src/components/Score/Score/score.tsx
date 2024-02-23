import { useState } from 'react';
import ScoreBanner from '../ScoreBanner';

import './score.css';

interface ScoreProps {
  title: string;
  score: number;
  ScoreComponent: React.FunctionComponent;
}

function Score({ title, score, ScoreComponent }: ScoreProps) {
  const [ expanded, setExpanded ] = useState<boolean>(true);
  return (
    <div>
      <ScoreBanner
        title={title}
        score={score}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {
        expanded
        && <ScoreComponent/>
      }
    </div>
  );
}

export default Score;
