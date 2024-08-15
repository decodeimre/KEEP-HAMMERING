import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoBackButton from "./utils/GoBackButton.jsx";
import { useEffect, useState, useContext } from "react";
import { DateContext } from "./context/dateContext.jsx";
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import DateFormat from "./utils/DateFormatter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import {
  faPlus,
  faMinus,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faPlus, faMinus, faCircleInfo);

export function ExerciseLog() {
  const { exerciseID, muscle } = useParams();
  const { state, dispatch, ACTIONS } = useContext(currentExerciseContext);
  const { date } = useContext(DateContext);
  const { setIsNewWorkout } = useContext(newWorkoutContext);
  const [showInfo, setShowInfo] = useState(false);

  // useEffect(() => {
  //   async function fetchExercise() {
  //     const fetchURL = `http://localhost:3000/workoutLog/${muscle}/exercises/${exerciseID}`;
  //     try {
  //       const response = await fetch(fetchURL);
  //       const data = await response.json();
  //       console.log(data);
  //       dispatch({
  //         type: ACTIONS.SET_EXERCISE_DETAILS,
  //         payload: {
  //           exerciseName: data.name,
  //           targetMuscle: data.targetMuscle,
  //           notes: data.notes,
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   fetchExercise();
  // }, [exerciseID, muscle]);


  
  //date is correct, but time difference 2 hours (to summer time)
  //need to check that!!!!!!!!!!!

  const saveExerciseSet = async (e) => {
    e.preventDefault();

    const newExerciseLog = {
      date: DateFormat(date),
      targetMuscle: state.exerciseDetails.targetMuscle,
      exerciseName: state.exerciseDetails.exerciseName,
      sets: state.currentSet,
    };
    async function saveToDB(newExerciseLog) {
      try {
        const postRequest = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExerciseLog),
        };
        const URL = `http://localhost:3000/workoutLog/exercise-log/save`;
        const response = await fetch(URL, postRequest);
        if (!response.ok) {
          throw new Error("failed to save to database");
        }

        setIsNewWorkout(true);
      } catch (err) {
        alert(err.message);
      }
    }
    saveToDB(newExerciseLog);
  };

  const handleSetUpdate = async () => {
    try {
      const updateRequest = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseLogID: state.exerciseLogID,
          updatedSet: state.currentSet,
        }),
      };
      const updatedSet = await fetch(
        `http://localhost:3000/workoutLog/exercise-log/update-set/`,
        updateRequest
      );
      if (!updatedSet.ok) {
        throw new Error("response for update not okay");
      }
      setIsNewWorkout(true);
      dispatch({ type: ACTIONS.TOGGLE_EDIT_MODE, payload: false });
    } catch (err) {
      alert(err.message);
    }
  };

  const changeUnit = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_SET,
      payload: { unit: e.target.value },
    });
  };

  const changeWeight = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_SET,
      payload: { weight: Number(e.target.value) },
    });
  };

  const changeReps = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_SET,
      payload: { reps: Number(e.target.value) },
    });
  };

  const incrementWeight = () => {
    const newWeight = state.currentSet.weight + 2.5;
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_SET,
      payload: { weight: newWeight },
    });
  };
  const decrementWeight = () => {
    if (state.currentSet.weight === 0) return;
    else {
      const newWeight = state.currentSet.weight - 2.5;
      dispatch({
        type: ACTIONS.UPDATE_CURRENT_SET,
        payload: { weight: newWeight },
      });
    }
  };
  const incrementReps = () => {
    const newRepNumber = state.currentSet.reps + 1;
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_SET,
      payload: { reps: newRepNumber },
    });
  };
  const decrementReps = () => {
    if (state.currentSet.reps === 0) return;
    else {
      const newRepNumber = state.currentSet.reps - 1;
      dispatch({
        type: ACTIONS.UPDATE_CURRENT_SET,
        payload: { reps: newRepNumber },
      });
    }
  };

  const showExerciseInfo = () => {
    setShowInfo(!showInfo);
  };

  console.log("ExerciseLog re-render");

  return (
    <>
      <Container className="containItMan mt-5">
        <Container>
          <Row>
            <Col>
              <h2>{state.exerciseDetails.exerciseName}</h2>
            </Col>
            <Col role="button" onClick={showExerciseInfo} className="text-end">
              <FontAwesomeIcon size="lg" icon={faCircleInfo} />
            </Col>
          </Row>
        </Container>
        {showInfo && (
          <h4 className="text-center">{state.exerciseDetails.notes}</h4>
        )}
        <Form onSubmit={saveExerciseSet} className="workoutSetLog-form">
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="8" className="custom-label">
              Weight
            </Form.Label>
            <Col sm="3">
              <Form.Select
                onChange={changeUnit}
                className="select-unit"
                value={state.currentSet.unit}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 ">
            <Col sm="3">
              <Button
                onClick={decrementWeight}
                variant="outline-secondary"
                className="increment-btn"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Col>
            <Col sm="6">
              <Form.Control
                onChange={changeWeight}
                value={state.currentSet.weight}
                type="number"
                className="custom-input"
                min="0"
                step="0.5"
              />
            </Col>
            <Col sm="3">
              <Button
                onClick={incrementWeight}
                variant="outline-secondary"
                className="increment-btn"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" className="custom-label">
              Reps
            </Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm="3">
              <Button
                variant="outline-secondary"
                onClick={decrementReps}
                className="increment-btn"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Col>
            <Col sm="6">
              <Form.Control
                onChange={changeReps}
                value={state.currentSet.reps}
                type="number"
                className="custom-input"
                min="0"
                step="1"
              />
            </Col>
            <Col sm="3">
              <Button
                variant="outline-secondary"
                onClick={() => incrementReps()}
                className="increment-btn"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Col>
          </Form.Group>

          <Row>
            {!state.isEditMode ? (
              <Col>
                <Button
                  variant="outline-info"
                  type="submit"
                  className="save-btn"
                >
                  Save
                </Button>
              </Col>
            ) : (
              <Col>
                <Button
                  variant="outline-danger"
                  onClick={handleSetUpdate}
                  className="save-btn"
                >
                  Update
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </Container>
      <GoBackButton />
    </>
  );
}
