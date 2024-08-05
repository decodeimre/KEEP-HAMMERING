import { createContext, useState } from "react";

export const newWorkoutContext = createContext();

export const NewWorkoutContextProvider = ({ children }) => {
  const [isNewWorkout, setIsNewWorkout] = useState(false);

  return (
    <newWorkoutContext.Provider value={{ isNewWorkout, setIsNewWorkout }}>
      {children}
    </newWorkoutContext.Provider>
  );
};
