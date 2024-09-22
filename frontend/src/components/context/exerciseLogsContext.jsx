import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./userContext.jsx";

export const ExerciseLogsContext = createContext();

export const ExerciseLogsProvider = ({ children }) => {
  //check loggedIn status and userID for exercises fetch
  const { isLoggedIn, user } = useContext(UserContext);
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const server = import.meta.env.VITE_Server;

  useEffect(() => {
    const fetchLogs = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await fetch(
            `${server}/${user.userID}`,
            {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            const errorResponse = await response.json();
            console.log(errorResponse.msg);
            setExerciseLogs([]);
          } else {
            const data = await response.json();
            setExerciseLogs(data.allExerciseLogs);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchLogs();
  }, [user]);

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

      return updatedLogs;
    });
  };

  const updateExerciseLog = (exerciseID, currentSet) => {
    setExerciseLogs((prevLogs) => {
      const updatedLogs = prevLogs.map((exercise) => {
        if (exercise._id === exerciseID) {
          const updatedSets = exercise.sets.map((set) =>
            set._id === currentSet._id ? currentSet : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });

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
