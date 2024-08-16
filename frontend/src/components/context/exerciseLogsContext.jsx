import { createContext, useState, useEffect } from "react";

export const ExerciseLogsContext = createContext();

export const ExerciseLogsProvider = ({ children }) => {
  const [exerciseLogs, setExerciseLogs] = useState([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem("exerciseLogs");
    if (storedLogs) {
      setExerciseLogs(JSON.parse(storedLogs));
    } else {
      const fetchLogs = async () => {
        console.log('fetching logged exercise sets from database')
        try {
          const response = await fetch('http://localhost:3000/workoutLog/exercise-log/getAll');
          if (!response.ok) {
            throw new Error("failed to fetch logged exercise sets");
          }
          const logs = await response.json();
          setExerciseLogs(logs);
          localStorage.setItem("exerciseLogs", JSON.stringify(logs));
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchLogs();
    }
  }, []);

  const addExerciseLog = (newLog) => {
    setExerciseLogs((prevLogs) => [...prevLogs, newLog]);
    localStorage.setItem(
      "exerciseLogs",
      JSON.stringify([...exerciseLogs, newLog])
    );
  };

  return (
    <ExerciseLogsContext.Provider value={{exerciseLogs, addExerciseLog}}>{children}</ExerciseLogsContext.Provider>
  )
};
