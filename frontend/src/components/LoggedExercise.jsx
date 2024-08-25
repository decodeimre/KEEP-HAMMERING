import {
  ListGroupItem,
  Container,
  Col,
  Row,
  Dropdown,
  Button,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import { ExerciseLogsContext } from "./context/exerciseLogsContext.jsx";
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoggedExercise({ exercise }) {
  const { dispatch, ACTIONS } = useContext(currentExerciseContext);
  const { deleteExerciseLog } = useContext(ExerciseLogsContext);
  const { sets, _id, targetMuscle, exerciseName } = exercise;
  const { setIsNewWorkout } = useContext(newWorkoutContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // show confirm pop up for deleting set
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // delete a set
  const handleDeleteSet = async (setID) => {
    try {
      const deleteRequest = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setID: setID, exerciseLogID: exercise._id }),
      };
      const deleteSet = await fetch(
        `http://localhost:3000/workoutLog/exercise-log/delete-set/`,
        deleteRequest
      );
      if (!deleteSet.ok) {
        throw new Error("failed to delete set");
      }
      deleteExerciseLog(exercise._id, setID);
      setIsNewWorkout(true);
      handleClose();
    } catch (err) {
      console.log(err);
      alert("handleDelete error");
    }
  };


  // pop up for confirming delete

  const ConfirmPopUp = ({ set }) => {
    return (
      <>
        <Modal dialogClassName="confirmPopUp" show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Deleting Set</Modal.Title>
          </Modal.Header>
          <Modal.Body >Are you sure, you want to delete this set?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-secondary" onClick={() => handleDeleteSet(set._id)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // select set to update
  const handleUpdateSelect = (set) => {
    const scrollUp = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
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

    const exerciseLogID = exercise._id;
    const setID = set._id;

    navigate(`/workoutLog/edit/${exerciseLogID}/${setID}`);
    scrollUp();
  };

  return (
    <ListGroupItem>
      <Container key={exercise._id}>
        <Row>
          <Col>
            <h3>{exerciseName}</h3>
          </Col>
        </Row>
        <Row>
          <Col>SETS</Col>
          <Col>WEIGHT (KG)</Col>
          <Col>REPS</Col>
          <Col></Col>
        </Row>
        {sets.map((set, index) => {
          return (
            <>
              <ConfirmPopUp set={set} />
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
                      {/*link not working - navigation needs to happen somehow else*/}

                      <Dropdown.Item onClick={() => handleUpdateSelect(set)}>
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>
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
