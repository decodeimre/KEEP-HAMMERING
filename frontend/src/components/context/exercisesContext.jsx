import { createContext, useState, useEffect } from "react";

export const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const allExercises = localStorage.getItem("allExercises");
    if (allExercises) {
      setExercises(JSON.parse(allExercises));
    } else {
      const fetchExercises = async () => {
        console.log('fetching all exercises from database')
        try {
          const response = await fetch('http://localhost:3000/exercises/getAll');
          if (!response.ok) {
            throw new Error("failed to fetch exercises");
          }
          const data = await response.json();
          setExercises(data);
          localStorage.setItem("allExercises", JSON.stringify(data));
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchExercises();
    }
  }, []);




  return (
    <ExercisesContext.Provider value={{exercises}}>{children}</ExercisesContext.Provider>
  )
};
