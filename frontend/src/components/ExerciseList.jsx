import { useEffect, useState, useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";
import GoBackButton from "./utils/GoBackButton.jsx";
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import { ExercisesContext } from "./context/exercisesContext.jsx";

export default function ExerciseList() {
  const { muscle } = useParams();
  const [exercises, setExercises] = useState([]); //for displaying all exercises for that muscle group
  const { dispatch, ACTIONS } = useContext(currentExerciseContext);
  const {allExercises} = useContext(ExercisesContext)

  //fetches the exercises for that muscle group
  useEffect(() => {
   
    const exerciseByMuscle = allExercises.filter(exercise => exercise.targetMuscle === muscle)
    setExercises(exerciseByMuscle)

  }, [muscle]);

  const setCurrentExercise = (exercise) => {
    dispatch({
      type: ACTIONS.SET_EXERCISE_DETAILS,
      payload: {
        targetMuscle: exercise.targetMuscle,
        exerciseName: exercise.name,
        notes: exercise.notes,
      },
    });
    dispatch({ type: ACTIONS.RESET_FORM });
  };

  return (
    <>
    <h2 className="text-center mt-5">{muscle} Exercises</h2>
      <ListGroup className="target-muscle-list">
        {exercises.map((exercise) => {
          return (
            <>
              <Link
                to={`/workoutLog/${muscle}/exercises/${exercise._id}`}
                style={{ textDecoration: "none" }}
              >
                <ListGroupItem
                  onClick={(exercise) => setCurrentExercise(exercise)}
                  action
                  variant="dark"
                  className="target-muscle-item"
                  key={exercise._id}
                >
                  {exercise.name}
                </ListGroupItem>
              </Link>
            </>
          );
        })}
      </ListGroup>
      <GoBackButton />
    </>
  );
}
