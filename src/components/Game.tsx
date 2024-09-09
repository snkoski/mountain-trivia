import React from 'react';
import { DisplayCard } from './DisplayCard';
import { GAME_LENGTH } from '../constants';
import { Item, River } from '../GameContainer';

type Data = {
  river: River;
  item: Item;
  answer: string;
};

type GameProps = {
  data: Data[];
  gameLength: number;
  setGameState: React.Dispatch<React.SetStateAction<'idle' | 'running' | 'over'>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

function reducer(
  state: {
    correctGuesses: number;
    currentQuestion: number;
    pendingGuess: string | undefined;
    error: boolean;
  },
  action: { type: string; payload?: string }
) {
  switch (action.type) {
    case 'increment_current_question':
      console.log('increment_current_question');
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'go_to_first_question':
      console.log('go_to_first_question');
      return { ...state, currentQuestion: 1 };
    case 'no_pending_guess':
      console.log('no_pending_guess');
      return { ...state, pendingGuess: undefined };
    case 'set_pending_guess':
      console.log('set_pending_guess');
      return { ...state, pendingGuess: action.payload };
    case 'set_next_question_error':
      console.log('set_next_question_error');
      return { ...state, error: true };
    case 'remove_next_question_error':
      console.log('remove_next_question_error');
      return { ...state, error: false };
    case 'correct_guess':
      console.log('correct_guess');
      return { ...state, correctGuesses: state.correctGuesses + 1 };
    default:
      return state;
  }
}

export function Game({ data, gameLength, setGameState, setScore }: GameProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    correctGuesses: 0,
    currentQuestion: 1,
    pendingGuess: '',
    error: false
  });

  React.useEffect(() => {
    if (state.currentQuestion > gameLength) {
      handleFinishGameState();
    }
  }, [state.currentQuestion]);

  const handleFinishGameState = () => {
    console.log('start game over');

    setGameState('over');
    setScore(state.correctGuesses);
    console.log('end game over');
  };

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.pendingGuess) {
      dispatch({ type: 'set_next_question_error' });
      return;
    }

    const answer = data[state.currentQuestion - 1].answer;
    console.log('answer', answer);
    console.log('state.pendingGuess', state.pendingGuess);
    // TODO: undo this
    if (state.pendingGuess === answer) {
      dispatch({ type: 'correct_guess' });
    }

    // if (answer) {
    //   dispatch({ type: 'correct_guess' });
    // }
    dispatch({ type: 'set_pending_guess', payload: '0' });
    dispatch({ type: 'increment_current_question' });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg">
        <p className="text-lg font-medium text-gray-800 mb-2">
          {/* Pending guess: <span className="font-bold">{state.pendingGuess}</span> */}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">River Trivia</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Question {state.currentQuestion}
        </h2>
        <h3 className="text-xl text-gray-600 mb-4">
          Score: <span className="font-bold">{state.correctGuesses}</span> /{' '}
          <span className="font-bold">{state.currentQuestion - 1}</span>
        </h3>
        <DisplayCard
          river={data[state.currentQuestion - 1].river}
          item={data[state.currentQuestion - 1].item}
        />
        <form onSubmit={(event) => handleSubmitAnswer(event)} className="flex flex-col gap-4 mt-6">
          <label htmlFor="guess" className="text-lg text-gray-700">
            Enter your guess:
          </label>
          <input
            id="guess"
            type="number"
            step="0.01"
            value={state.pendingGuess}
            onChange={(e) => {
              dispatch({ type: 'remove_next_question_error' });
              dispatch({ type: 'set_pending_guess', payload: e.target.value });
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {state.currentQuestion === GAME_LENGTH ? 'Finish' : 'Submit'}
          </button>
        </form>
        {state.error && <p className="text-red-500 mt-2">Please enter a valid number</p>}
      </div>
    </div>
  );
}
