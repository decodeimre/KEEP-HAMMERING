import { createContext, useState, useEffect } from "react";

export const ExerciseLogsContext = createContext();

export const ExerciseLogsProvider = ({ children }) => {
  const [exerciseLogs, setExerciseLogs] = useState([]);

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

  useEffect(() => {
    const storedLogs = localStorage.getItem("exerciseLogs");
    if (storedLogs) {
      setExerciseLogs(JSON.parse(storedLogs));
    } else {
      fetchLogs();
    }
  }, []);

  const addExerciseLog = (newExerciseLog) => {
    setExerciseLogs((prevLogs) => {
      const exerciseExists = exerciseLogs.some(
        (exercise) => exercise._id === newExerciseLog._id
      );

      let updatedLogs;
      if (exerciseExists) {
        //if already logged, replace with updated version
        updatedLogs = prevLogs.map((exercise) =>
          exercise._id === newExerciseLog._id ? newExerciseLog : exercise
        );
      } else {
        updatedLogs = [...prevLogs, newExerciseLog];
      }

      localStorage.setItem("exerciseLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  const deleteExerciseLog = (exerciseID, setID) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = prevLogs
        .map((exercise) => {
          if (exercise._id === exerciseID) {
            const updatedSets = exercise.sets.filter(
              (set) => set._id !== setID
            );
            if (updatedSets.length === 0) {
              return null; //if no sets are left - mark exercise for deletion in next filter step
            }
            return { ...exercise, sets: updatedSets };
          }
          return exercise;
        })
        .filter((exercise) => exercise !== null);

      localStorage.setItem("exerciseLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  const updateExerciseLog = (exerciseID, currentSet) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = prevLogs.map((exercise) => {
        if (exercise._id === exerciseID) {
          const updatedSets = exercise.sets.map((set) =>
            set._id === currentSet.id ? currentSet : set
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
