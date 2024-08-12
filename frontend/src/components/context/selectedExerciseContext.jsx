import { createContext, useState } from "react";

export const selectedExerciseContext = createContext();

export const SelectedExerciseProvider = ({ children }) => {
  const [selectedExercise, setSelectedExercise] = useState({
    exerciseName: '',
    targetMuscle: '',
  });

  return (
    <selectedExerciseContext.Provider
      value={{
        selectedExercise,
        setSelectedExercise,
      }}
    >
      {children}
    </selectedExerciseContext.Provider>
  );
};
