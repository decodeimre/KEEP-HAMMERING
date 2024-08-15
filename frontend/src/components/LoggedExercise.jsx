import { ListGroupItem, Container, Col, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import { DateContext } from "./context/dateContext.jsx";
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoggedExercise({ exercise }) {
  // const [update, setUpdate] = useState(false); // for showing update Button or not
  const { state, dispatch, ACTIONS } = useContext(currentExerciseContext);
  const { date } = useContext(DateContext);
  const { sets, _id, targetMuscle, exerciseName } = exercise;
  const { setIsNewWorkout } = useContext(newWorkoutContext);
  const navigate = useNavigate();

  // delete a set
  const handleDeleteSet = async (id) => {
    try {
      const deleteRequest = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setID: id, exerciseLogID: exercise._id }),
      };
      const deleteSet = await fetch(
        `http://localhost:3000/workoutLog/exercise-log/delete-set/`,
        deleteRequest
      );
      if (!deleteSet.ok) {
        throw new Error("failed to delete set");
      }
      setIsNewWorkout(true);
    } catch (err) {
      console.log(err);
      alert("handleDelete error");
    }
  };

  // select set to update
  const handleUpdateSelect = (set) => {
    const selectedSet = {
      weight: set.weight,
      reps: set.reps,
      unit: set.unit,
      id: set._id,
    };
    console.log(exercise);

    const selectedExerciseDetails = {
      targetMuscle: exercise.targetMuscle,
      exerciseName: exercise.exerciseName,
      notes: exercise.notes,
    };
    dispatch({ type: ACTIONS.UPDATE_CURRENT_SET, payload: selectedSet });
    dispatch({
      type: ACTIONS.SET_EXERCISE_DETAILS,
      payload: selectedExerciseDetails,
    });
    dispatch({ type: ACTIONS.TOGGLE_EDIT_MODE, payload: true });
    dispatch({ type: ACTIONS.SET_SELECTED_LOG, payload: exercise._id });

    const exerciseLogID = exercise._id
    const setID = set._id    
   
    
    navigate(`/workoutLog/edit/${exerciseLogID}/${setID}`);
  };

  return (
    <ListGroupItem>
      <Container key={exercise._id}>
        <Row>
          <Col>
            <h3>
              {exerciseName}  
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>SETS</Col>
          <Col>WEIGHT IN KG</Col>
          <Col>REPS</Col>
          <Col></Col>
        </Row>
        {sets.map((set, index) => {
          return (
            <>
              <Row key={index} className="bg-info pt-2">
                <Col >
                  <h5>{index + 1}</h5>
                </Col>
                <Col >{set.weight}</Col>
                <Col>{set.reps}</Col>
                <Col className="text-end">
                  <Dropdown>
                    <Dropdown.Toggle variant className="custom-dropdown">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/*link not working - navigation needs to happen somehow else*/}

                      <Dropdown.Item onClick={() => handleUpdateSelect(set)}>
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleDeleteSet(set._id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </>
          );
        })}
      </Container>
    </ListGroupItem>
  );
}
