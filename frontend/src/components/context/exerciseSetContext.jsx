import { createContext, useState, useEffect } from "react";

export const exerciseSetContext = createContext();

export const ExerciseSetContextProvider = ({ children }) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [currentSet, setCurrentSet] = useState({});

  useEffect(() => {
    setCurrentSet({ weight, reps, unit });
  }, [weight, reps, unit]);

  return (
    <exerciseSetContext.Provider
      value={{
        weight,
        setWeight,
        reps,
        setReps,
        unit,
        setUnit,
        currentSet,
        setCurrentSet,
      }}
    >
      {children}
    </exerciseSetContext.Provider>
  );
};
