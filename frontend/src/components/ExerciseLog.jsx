import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoBackButton from "./GoBackButton.jsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import {
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faPlus, faMinus);




export function ExerciseLog() {
  const { exerciseID, muscle } = useParams();
  //should ultimately be a context for use on other pages:
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    async function fetchExercise() {
      const fetchURL = `http://localhost:3000/workoutLog/${muscle}/exercises/${exerciseID}`;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log(data);
        setExercise(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchExercise();
  }, [exerciseID, muscle]);

  return (
    <>
<Container className="containItMan mt-5">
<h2>{exercise.name}</h2>
      <Form className="workoutSetLog-form">
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="8" className="custom-label">
            Weight
          </Form.Label>
          <Col sm="3">
            <Form.Select className="select-unit">
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Col sm="3">
            <Button variant="outline-secondary" className="increment-btn">
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Col>
          <Col sm="6">
            <Form.Control type="number" className="custom-input" min="0" />
          </Col>
          <Col sm="3">
            <Button variant="outline-secondary" className="increment-btn">
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
            <Button variant="outline-secondary" className="increment-btn">
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Col>
          <Col sm="6">
            <Form.Control type="number" className="custom-input" min="0" />
          </Col>
          <Col sm="3">
            <Button variant="outline-secondary" className="increment-btn">
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
