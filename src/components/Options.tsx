import { useContext } from 'react';
import { DifficultyContext } from '../contexts/DifficultyProvider';

export function Options() {
  const { difficulty, update: setDifficulty } = useContext(DifficultyContext);
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="difficulty"
          value="normal"
          checked={difficulty === 'normal'}
          onChange={() => setDifficulty('normal')}
          className="form-radio text-blue-600"
        />
        <span className="text-gray-700">Normal</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="difficulty"
          value="easy"
          checked={difficulty === 'easy'}
          onChange={() => setDifficulty('easy')}
          className="form-radio text-blue-600"
        />
        <span className="text-gray-700">Easy</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="difficulty"
          value="very_easy"
          checked={difficulty === 'very_easy'}
          onChange={() => setDifficulty('very_easy')}
          className="form-radio text-blue-600"
        />
        <span className="text-gray-700">Very Easy</span>
      </label>
    </div>
  );
}
