import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoBackButton from "./GoBackButton.jsx";
import { useEffect, useState, useContext } from "react";
import { DateContext } from "./context/dateContext.jsx";
import DateFormat from "./DateFormatter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


// Add the imported icons to the library
library.add(faPlus, faMinus);

export function ExerciseLog() {
  const { exerciseID, muscle } = useParams();
  //should ultimately be a context for use on other pages:
  const [exercise, setExercise] = useState({});
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [unit, setUnit] = useState('kg');
  const {date} = useContext(DateContext)

  useEffect(() => {
    async function fetchExercise() {
      const fetchURL = `http://localhost:3000/workoutLog/${muscle}/exercises/${exerciseID}`;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log(data);
        setExercise(data); // set the exercise to log for the form
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchExercise();
  }, [exerciseID, muscle]);

//saving the Set weirdly with 1 day difference (1 day early in the Date...)
//need to check that!!!!!!!!!!!

  const saveExerciseSet = (e) => {
      e.preventDefault();
        const newSet = {
          weight: weight,
          reps: reps,
          unit: unit,
        }
        console.log(newSet)
        const newExerciseLog = {
        date: DateFormat(date),
        targetMuscle: exercise.targetMuscle,
        exerciseName: exercise.name,
        sets: newSet
      }
      async function saveToDB (newExerciseLog) {
        const postRequest = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newExerciseLog)
        }
        const URL = `http://localhost:3000/workoutLog/exercise-log/save`
        const response = await fetch(URL, postRequest);
        const data =  await response.json();
        // console.log(data)
      }
      saveToDB(newExerciseLog);
  }

  const changeUnit = (e) => {
    setUnit (e.target.value)
  }

  const changeWeight = (e) => {
    setWeight(Number(e.target.value))
  }

  const changeReps = (e) => {
    setReps(Number(e.target.value))
  }

  const incrementWeight = () => {
    const newWeight = weight + 2.5;
    setWeight(newWeight);
  };
  const decrementWeight = () => {
    if (weight === 0) return;
    else {
      const newWeight = weight - 2.5;
      setWeight(newWeight);
    }
  };
  const incrementReps = () => {
    const newRepNumber = reps + 1;
    setReps(newRepNumber);
  };
  const decrementReps = () => {
    if (reps === 0) return;
    else {
      const newRepNumber = reps - 1;
      setReps(newRepNumber);
    }
  };

  return (
    <>
      <Container className="containItMan mt-5">
        <h2>{exercise.name}</h2>
        <Form onSubmit={saveExerciseSet} className="workoutSetLog-form">
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="8" className="custom-label">
              Weight
            </Form.Label>
            <Col sm="3">
              <Form.Select onChange={changeUnit} className="select-unit">
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
                value={weight}
                type="number"
                className="custom-input"
                min="0"
                step="0.1"
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
                value={reps}
                type="number"
                className="custom-input"
                min="0"
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
