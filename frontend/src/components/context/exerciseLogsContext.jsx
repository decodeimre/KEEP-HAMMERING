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
        console.log("fetching logged exercise sets from database");
        try {
          const response = await fetch(
            "http://localhost:3000/workoutLog/exercise-log/getAll"
          );
          if (!response.ok) {
            throw new Error("failed to fetch logged exercise sets");
          }
          const data = await response.json();
          setExerciseLogs(data.allExerciseLogs);
          localStorage.setItem(
            "exerciseLogs",
            JSON.stringify(data.allExerciseLogs)
          );
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchLogs();
    }
  }, []);

  const addExerciseLog = (newLog) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      localStorage.setItem(
        "exerciseLogs",
        JSON.stringify([...exerciseLogs, newLog])
      );
      return updatedLogs;
    });
  };

  const deleteExerciseLog = (exerciseID, setID) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = prevLogs.map((exercise) => {
        if (exercise._id === exerciseID) {
          const updatedSets = exercise.sets.filter((set) => set._id !== setID);
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });

      localStorage.setItem("exerciseLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  const updateExerciseLog = (exerciseID, setID, setValues) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = prevLogs.map((exercise) => {
        if (exercise._id === exerciseID) {
          const updatedSets = exercise.sets.map((set) =>
            set._id === setID ? { ...set, ...setValues } : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });

      localStorage.setItem("exerciseLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  return (
    <ExerciseLogsContext.Provider
      value={{
        exerciseLogs,
        addExerciseLog,
        deleteExerciseLog,
        updateExerciseLog,
      }}
    >
      {children}
    </ExerciseLogsContext.Provider>
  );
};
