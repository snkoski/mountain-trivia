import { createContext, useContext, useState, PropsWithChildren } from 'react';

// Define the types for the context value and difficulty
type Difficulty = 'normal' | 'easy' | 'very_easy';
type DifficultyContextType = {
  difficulty: Difficulty;
  update: (difficulty: Difficulty) => void;
};

// Create the context with a default value
export const DifficultyContext = createContext<DifficultyContextType>({} as DifficultyContextType);

// Create a provider component
export const DifficultyProvider = ({ children }: PropsWithChildren) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const update = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  const value = {
    difficulty,
    update
  };

  return <DifficultyContext.Provider value={value}>{children}</DifficultyContext.Provider>;
};

// Custom hook to use the DifficultyContext
export const useDifficulty = () => {
  const context = useContext(DifficultyContext);
  if (!context) {
    throw new Error('useDifficulty must be used within a DifficultyContextProvider');
  }
  return context;
};
