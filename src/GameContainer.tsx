import data from './data.json';
import { Game } from './components/Game';
import React from 'react';
import { GameOver } from './components/GameOver';
import { GAME_LENGTH } from './constants';

export type River = {
  name: string;
  length: number;
  length_unit: string;
  location: string;
  fact: string;
};

export type Item = {
  name: string;
  length: number;
  length_unit: string;
  fact: string;
};

export type Data = {
  rivers: River[];
  items: Item[];
  answer?: string;
};

// makes an array of river and item pairs
const makeQuestions = ({ rivers, items }: Data) => {
  const questions = rivers.map((river) => {
    const item = items[Math.floor(Math.random() * items.length)];
    const answer = (river.length / item.length).toFixed(2);

    return { river, item, answer };
  });
  return questions;
};

const info = makeQuestions(data);

export function GameContainer() {
  const [gameState, setGameState] = React.useState<'idle' | 'running' | 'over'>('idle');
  const [score, setScore] = React.useState(0);
  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-teal-400 text-white">
        <button
          onClick={() => setGameState('running')}
          className="bg-yellow-500 text-black px-8 py-4 rounded-full text-xl font-semibold shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Start Game
        </button>
        <p className="mt-4 text-sm">Click to begin your adventure!</p>
      </div>
    );
  }
  if (gameState === 'running') {
    return (
      <Game data={info} gameLength={GAME_LENGTH} setGameState={setGameState} setScore={setScore} />
    );
  }

  if (gameState === 'over') {
    return <GameOver score={score} setGameState={setGameState} />;
  }
}
