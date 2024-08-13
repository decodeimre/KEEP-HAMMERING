import { ListGroupItem, Container, Col, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import { DateContext } from "./context/dateContext.jsx";
import { useContext, useState } from "react";
import DateFormat from "./utils/DateFormatter.jsx";

export default function LoggedExercise({ exercise }) {
  // const [update, setUpdate] = useState(false); // for showing update Button or not
  const { state, dispatch, ACTIONS } = useContext(currentExerciseContext);
  const { date } = useContext(DateContext);
  const { sets, _id, targetMuscle, exerciseName } = exercise;
  const { setIsNewWorkout } = useContext(newWorkoutContext);

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
      _id: set._id,
    };
    console.log(exercise)
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
  };

  // const handleSetUpdate = async () => {
  // const dateQuery = DateFormat(date);
  // const fetchURL = `http://localhost:3000/workoutLog/exercise-log/update-set/${id}/?date=${dateQuery}`;
  //     try {
  //       const updateRequest = {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           setID: id,
  //           exerciseLogID: exercise._id,
  //           updatedSet: currentSet,
  //         }),
  //       };
  //       const updatedSet = await fetch(
  //         `http://localhost:3000/workoutLog/exercise-log/update-set/`,
  //         updateRequest
  //       );
  //       if (!updatedSet.ok) {
  //         throw new Error("response for update not okay");
  //       }
  //       setIsNewWorkout(true);
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   };

  return (
    <ListGroupItem>
      <Container key={_id}>
        <Row>
          <Col>
            <h3>
              {exerciseName} (weight in {sets[0].unit}){" "}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>SETS</Col>
          <Col>WEIGHT</Col>
          <Col>REPS</Col>
          <Col></Col>
        </Row>
        {sets.map((set, index) => {
          return (
            <>
              <Row key={index} className="bg-info pt-2">
                <Col>
                  <h5>{index + 1}</h5>
                </Col>
                <Col>{set.weight}</Col>
                <Col>{set.reps}</Col>
                <Col className="text-end">
                  <Dropdown>
                    <Dropdown.Toggle variant className="custom-dropdown">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link
                        to={`/workoutLog/${targetMuscle}/exercises/${_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Dropdown.Item onClick={() => handleUpdateSelect(set)}>
                          Edit
                        </Dropdown.Item>
                      </Link>
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
