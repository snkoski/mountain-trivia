import { createContext, useContext, useState, PropsWithChildren } from 'react';

// Define the types for the context value and difficulty
export type Score = {
  name: string;
  score: number;
};

type HighScoresContextType = {
  highScores: Score[];
  update: (score: Score) => void;
};

// Create the context with a default value
export const HighScoresContext = createContext<HighScoresContextType>({} as HighScoresContextType);

// Create a provider component
export const HighScoresProvider = ({ children }: PropsWithChildren) => {
  const [highScores, setHighScores] = useState<Score[]>(() => {
    const storedScores = localStorage.getItem('river-trivia-high-scores');
    return storedScores
      ? JSON.parse(storedScores)
      : [
          { name: '', score: 0 },
          { name: '', score: 0 },
          { name: '', score: 0 },
          { name: '', score: 0 },
          { name: '', score: 0 }
        ];
  });

  const update = (score: Score) => {
    setHighScores((prev) => {
      const newScores = [...prev, score];
      newScores.sort((a, b) => b.score - a.score);
      const topScores = newScores.slice(0, 5);

      // Update localStorage with the new top scores
      localStorage.setItem('river-trivia-high-scores', JSON.stringify(topScores));

      return topScores;
    });
  };

  const value = {
    highScores,
    update
  };

  return <HighScoresContext.Provider value={value}>{children}</HighScoresContext.Provider>;
};

// Custom hook to use the DifficultyContext
export const useDifficulty = () => {
  const context = useContext(HighScoresContext);
  if (!context) {
    throw new Error('useDifficulty must be used within a DifficultyContextProvider');
  }
  return context;
};
