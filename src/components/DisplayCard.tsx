import { useContext, useState } from 'react';
import { Item, River } from '../GameContainer';
import { DifficultyContext } from '../contexts/DifficultyProvider';
import distanceConverter from '../helpers/conversions';

type DisplayCardProps = {
  river: River;
  item: Item;
};

export function DisplayCard({ river, item }: DisplayCardProps) {
  const { difficulty } = useContext(DifficultyContext);
  const [isRiverFactOpen, setIsRiverFactOpen] = useState(false);
  const [isItemFactOpen, setIsItemFactOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col gap-4">
        <p className="text-lg">
          How many <span className="font-semibold">{item.name}s</span> would it take to get to get
          to the top of <span className="font-semibold">{river.name}</span>?
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {river.name}
          {difficulty === 'very_easy' && (
            <span className="text-blue-600 text-base"> ({river.length} meters)</span>
          )}
        </p>
        <div>
          <button
            onClick={() => setIsRiverFactOpen(!isRiverFactOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full text-left"
          >
            {isRiverFactOpen ? 'Hide River Fact' : 'Show River Fact'}
          </button>
          {isRiverFactOpen && (
            <div className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-gray-800">{river.fact}</p>
            </div>
          )}
        </div>
        <p className="text-lg text-gray-700">
          Item: {item.name}
          {(difficulty === 'easy' || difficulty === 'very_easy') && (
            <span className="text-green-600 text-base">
              {' '}
              ({distanceConverter.metersToInches(item.length)} inches)
            </span>
          )}
        </p>
        <div className="mt-4">
          <button
            onClick={() => setIsItemFactOpen(!isItemFactOpen)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-full text-left"
          >
            {isItemFactOpen ? 'Hide Item Fact' : 'Show Item Fact'}
          </button>
          {isItemFactOpen && (
            <div className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-gray-800">{item.fact}</p>
            </div>
          )}
        </div>
        {/* <p className="text-lg font-medium text-gray-600">Answer: {answer}</p> */}
      </div>
    </div>
  );
}
