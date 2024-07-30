import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoBackButton from "./GoBackButton.jsx";
import { useEffect, useState } from "react";

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
    <Container className="containItMan">

      <h2>{exercise.name}</h2>
      <Container className="workoutSetLog-form">
        <Form>
          <Container className="d-flex">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number" min="0" step="2.5" placeholder="0" />
              <Form.Text>
                We`ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="">
              <Form.Label>KG or LBS</Form.Label>
              <Form.Select type="number" min="0" step="2.5" placeholder="0">
                <option>KG</option>
                <option>LBS</option>
              </Form.Select>
            </Form.Group>
          </Container>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repetitions</Form.Label>
            <Form.Control type="number" min="0" placeholder="0" />
          </Form.Group>

          <Button variant="dark" type="submit">
            Save Set
          </Button>
        </Form>
      </Container>
      <GoBackButton />
    </Container>
    </>
  );
}
