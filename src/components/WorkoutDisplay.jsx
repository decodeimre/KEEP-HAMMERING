import TargetMuscleList from "./TargetMuscle.jsx";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faAngleLeft, faPlus, faAngleRight);
import DateSelecter from "./DateSelecter.jsx";


export function WorkoutDisplay() {
  const [isNewWorkout, setIsNewWorkout] = useState(false);

  return (
    <>
      <DateSelecter />
      {isNewWorkout ? (
        <TargetMuscleList />
      ) : (
        <Container>
          <Row>
            <div className="d-flex justify-content-center align-items-center empty-workout-log">
              <h1>Workout Log Empty</h1>
            </div>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <div
                onClick={() => setIsNewWorkout(true)}
                className="workout-plus "
              >
                <FontAwesomeIcon icon="plus" size="4x" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <h4>Add New Workout</h4>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
