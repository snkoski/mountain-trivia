import data from './data.json';
import { Game } from './components/Game';
import React from 'react';
import { GameOver } from './components/GameOver';
import { GAME_LENGTH } from './constants';
import distanceConverter from './helpers/conversions';

export type Mountain = {
  name: string;
  height: number;
  height_unit: string;
  location: string;
  fact: string;
};

export type Item = {
  name: string;
  height: number;
  height_unit: string;
  fact: string;
};

export type Data = {
  mountains: Mountain[];
  items: Item[];
  answer?: string;
};

// makes an array of mountain and item pairs
const makeQuestions = ({ mountains, items }: Data) => {
  const questions = mountains.map((mountain) => {
    const item = items[Math.floor(Math.random() * items.length)];
    const answer = (mountain.height / item.height).toFixed(2);
    // const itemInInches = {
    //   ...item,
    //   height: distanceConverter.metersToInches(item.height),
    //   height_unit: 'inches'
    // };
    // return { mountain, item: itemInInches, answer };
    return { mountain, item, answer };
  });
  return questions;
};

let info = makeQuestions(data);

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
