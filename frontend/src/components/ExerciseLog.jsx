import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoBackButton from "./utils/GoBackButton.jsx";
import { useEffect, useState, useContext } from "react";
import { DateContext } from "./context/dateContext.jsx";
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { exerciseSetContext } from "./context/exerciseSetContext.jsx";
import { selectedExerciseContext } from "./context/selectedExerciseContext.jsx";
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
  //should ultimately be a context for use on other pages:
  const [exercise, setExercise] = useState({});
  const { currentSet, setCurrentSet } = useContext(exerciseSetContext);
  const {selectedExercise, setSelectedExercise} = useContext(selectedExerciseContext)
  const { date } = useContext(DateContext);
  const { setIsNewWorkout } = useContext(newWorkoutContext);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCurrentSet({
      weight: 0,
      reps: 0,
      unit: "kg",
    });
  }, []);

  useEffect(() => {

  }, [selectedExercise, currentSet])

  useEffect(() => {
    async function fetchExercise() {
      const fetchURL = `http://localhost:3000/workoutLog/${muscle}/exercises/${exerciseID}`;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        setExercise(data); // set the exercise to log for the form
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchExercise();
  }, [exerciseID, muscle]);

  //date is correct, but time difference 2 hours (to summer time)
  //need to check that!!!!!!!!!!!

  const saveExerciseSet = async (e) => {
    e.preventDefault();

    const newExerciseLog = {
      date: DateFormat(date),
      targetMuscle: exercise.targetMuscle,
      exerciseName: exercise.name,
      sets: currentSet,
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

  const changeUnit = (e) => {
    setCurrentSet({
      ...currentSet,
      unit: e.target.value,
    });
  };

  const changeWeight = (e) => {
    setCurrentSet({
      ...currentSet,
      weight: e.target.value,
    });
  };

  const changeReps = (e) => {
    setCurrentSet({
      ...currentSet,
      reps: e.target.value,
    });
  };

  const incrementWeight = () => {
    const newWeight = currentSet.weight + 2.5;
    setCurrentSet({
      ...currentSet,
      weight: newWeight,
    });
  };
  const decrementWeight = () => {
    if (currentSet.weight === 0) return;
    else {
      const newWeight = currentSet.weight - 2.5;
      setCurrentSet({
        ...currentSet,
        weight: newWeight,
      });
    }
  };
  const incrementReps = () => {
    const newRepNumber = currentSet.reps + 1;
    setCurrentSet({
      ...currentSet,
      reps: newRepNumber,
    });
  };
  const decrementReps = () => {
    if (currentSet.reps === 0) return;
    else {
      const newRepNumber = currentSet.reps - 1;
      setCurrentSet({
        ...currentSet,
        reps: newRepNumber,
      });
    }
  };

  const showExerciseInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <Container className="containItMan mt-5">
        <Container>
          <Row>
            <Col>
              <h2>{selectedExercise.exerciseName}</h2>
            </Col>
            <Col role="button" onClick={showExerciseInfo} className="text-end">
              <FontAwesomeIcon size="lg" icon={faCircleInfo} />
            </Col>
          </Row>
        </Container>
        {showInfo && <h4 className="text-center">{exercise.notes}</h4>}
        <Form onSubmit={saveExerciseSet} className="workoutSetLog-form">
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="8" className="custom-label">
              Weight
            </Form.Label>
            <Col sm="3">
              <Form.Select onChange={changeUnit} className="select-unit" value={currentSet.unit}>
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
                value={currentSet.weight}
                type="number"
                className="custom-input"
                min="0"
                step="2.5"
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
                value={currentSet.reps}
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
            <Col>
              <Button variant="outline-info" type="submit" className="save-btn">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <GoBackButton />
    </>
  );
}
