import { createContext, useState, useEffect } from "react";


export const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const [allExercises, setExercises] = useState([]);
  const server = import.meta.env.VITE_Server;

  useEffect(() => {
    const fetchExercises = async () => {
      console.log("fetching all exercises from database");
      try {
        const response = await fetch(`${server}/exercises/getAll`);
        if (!response.ok) {
          throw new Error("failed to fetch exercises");
        }
        const data = await response.json();
        console.log(data)
        setExercises(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExercises();
  }, []);

  return (
    <ExercisesContext.Provider value={{ allExercises }}>
      {children}
    </ExercisesContext.Provider>
  );
};
