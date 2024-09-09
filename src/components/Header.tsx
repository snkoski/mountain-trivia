import React from 'react';
import { Options } from './Options';
import { HighScores } from './HighScores';

export function Header() {
  const [optionsIsOpen, setOptionsIsOpen] = React.useState(false);
  const [highScoresIsOpen, setHighScoresIsOpen] = React.useState(false);

  return (
    <header className="flex flex-col items-center p-4 bg-gray-100 shadow-md w-full">
      <div className="flex justify-between items-center w-full mx-auto relative">
        {/* Empty div to take up space on the left side */}
        <div className="flex-1"></div>

        {/* Centered title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">
          River Length Trivia!!
        </h1>

        {/* Right-aligned buttons */}
        <div className="flex items-center gap-4 justify-end flex-1 relative">
          <div className="relative">
            <button
              onClick={() => setOptionsIsOpen(!optionsIsOpen)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            >
              Options
            </button>
            {optionsIsOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <Options />
              </div>
            )}
          </div>
          <button
            onClick={() => setHighScoresIsOpen(!highScoresIsOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            High Scores
          </button>
          {highScoresIsOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-4 right-0">
              <HighScores setHighScoresIsOpen={setHighScoresIsOpen} />
            </div>
          )}
        </div>
      </div>
      <h2 className="mt-4 text-xl text-gray-700">Test Your Knowledge</h2>
    </header>
  );
}
