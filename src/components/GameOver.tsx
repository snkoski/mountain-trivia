import { useContext, useState } from 'react';
import { HighScoresContext } from '../contexts/HighScoresProvider';
import { GAME_LENGTH } from '../constants';
import { HighScoreList } from './HighScoreList';

type GameOverProps = {
  score: number;
  setGameState: React.Dispatch<React.SetStateAction<'idle' | 'running' | 'over'>>;
};

export function GameOver({ score, setGameState }: GameOverProps) {
  // score = 2;
  const { highScores } = useContext(HighScoresContext);
  const lowestHighScore = highScores.length >= 5 ? highScores[highScores.length - 1]?.score : 0;
  const [highScorePending, setHighScorePending] = useState<boolean>(() => {
    return score > lowestHighScore;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-river bg-cover p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Game Over</h1>
      <p className="text-lg text-gray-700 mb-2">
        You scored {score}/{GAME_LENGTH}
      </p>
      {highScorePending && (
        <h2 className="text-2xl font-semibold text-green-500 mb-4">NEW HIGH SCORE!</h2>
      )}
      <HighScoreList
        score={score}
        highScorePending={highScorePending}
        setHighScorePending={setHighScorePending}
      />
      <button
        onClick={() => {
          setGameState('idle');
        }}
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Play Again
      </button>
    </div>
  );
}
