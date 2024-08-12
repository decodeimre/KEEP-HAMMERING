import { createContext, useState } from "react";

export const exerciseSetContext = createContext();

export const ExerciseSetContextProvider = ({ children }) => {

  const [currentSet, setCurrentSet] = useState({
    weight: 0,
    reps: 0,
    unit: "kg"
  });


  return (
    <exerciseSetContext.Provider
      value={{
        currentSet,
        setCurrentSet,
      }}
    >
      {children}
    </exerciseSetContext.Provider>
  );
};
