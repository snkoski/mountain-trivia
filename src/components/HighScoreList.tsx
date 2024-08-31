import { useContext, useState } from 'react';
import { HighScoresContext, Score } from '../contexts/HighScoresProvider';

type HighScoreListProps = {
  score: number;
  highScorePending: boolean;
  setHighScorePending: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HighScoreList({
  score,
  highScorePending,
  setHighScorePending
}: HighScoreListProps) {
  const { highScores, update: setHighScores } = useContext(HighScoresContext);
  const [newPlayerName, setNewPlayerName] = useState('');
  // const [highScorePending, setHighScorePending] = useState<boolean>(() => {
  //   return highScores.length < 5 || score > highScores[highScores.length - 1].score;
  // });
  console.log('highScores', highScores);

  const getScorePostion = (newScore: number, highScores: Score[]) => {
    const position = highScores.findIndex((highScore) => newScore > highScore.score);
    return position;
  };

  const handleSubmit = () => {
    setHighScores({ name: newPlayerName, score: score });
    setHighScorePending(false);
  };

  const buildList = (newScore: number, highScores: Score[]) => {
    if (!highScorePending) {
      return (
        <div className="flex flex-col min-w-72 bg-white rounded-lg shadow-md">
          <h3 className="self-center text-xl font-semibold">High Scores</h3>
          <ol className="w-full max-w-md mx-auto  p-4">
            {highScores.map((highScore, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <span className="text-gray-700 font-medium">{highScore.name}</span>
                <span className="text-gray-600">{highScore.score}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    const scorePosition = getScorePostion(newScore, highScores);
    // get high scores before and after new score
    const highScoresBefore = highScores.slice(0, scorePosition);
    const highScoresAfter = highScores.slice(scorePosition, 4);
    return (
      <ol className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
        {highScoresBefore.map((highScore, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span className="text-gray-700 font-medium">{highScore.name}</span>
            <span className="text-gray-600">{highScore.score}</span>
          </li>
        ))}
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value.toUpperCase())}
            placeholder="Your name"
            className="w-full mr-2 p-2 border border-gray-300 rounded-lg"
            maxLength={3}
          />
          <span className="text-gray-600">{newScore}</span>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Submit
          </button>
        </li>
        {highScoresAfter.map((highScore, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span className="text-gray-700 font-medium">{highScore.name}</span>
            <span className="text-gray-600">{highScore.score}</span>
          </li>
        ))}
      </ol>
    );
  };

  const highScoreList = buildList(score, highScores);

  return highScoreList;
}
