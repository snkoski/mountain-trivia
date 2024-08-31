import React, { useContext, useEffect } from 'react';
import { HighScoresContext } from '../contexts/HighScoresProvider';

type ModalProps = {
  setHighScoresIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HighScores({ setHighScoresIsOpen }: ModalProps) {
  const { highScores } = useContext(HighScoresContext);
  const handleClose = () => setHighScoresIsOpen(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">High Scores</h2>
        <ul className="mb-6">
          {highScores.map((score, index) => (
            <li key={index} className="flex justify-between">
              <span>{score.name}</span>
              <span>{score.score}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClose}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
