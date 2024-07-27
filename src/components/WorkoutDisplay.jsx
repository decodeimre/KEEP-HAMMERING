import { Link } from "react-router-dom";
import TargetMuscleList from "./TargetMuscle.jsx";
import { useContext, useState } from "react";
import { DateContext } from "./context/dateContext.jsx";
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

export function WorkoutDisplay() {
  const { date, goOneDayBack, goOneDayForward } = useContext(DateContext);
  let selectedDate = date.toDateString();

  const [isNewWorkout, setIsNewWorkout] = useState(false);

  return (
    <>
      <Container className="p-3">
        <Row className="justify-content-md-center border-bottom">
          <Col className="col-2 d-flex justify-content-start">
            <div onClick={goOneDayBack} className="change-day-arrow">
              <FontAwesomeIcon icon="angle-left" size="3x" />
            </div>
          </Col>
          <Col className="d-flex justify-content-center col-8">
            <h2>
              {selectedDate === new Date().toDateString()
                ? "Today"
                : selectedDate}
            </h2>
          </Col>
          <Col className="col-2 d-flex justify-content-end">
            <div onClick={goOneDayForward} className="change-day-arrow">
              <FontAwesomeIcon icon="angle-right" size="3x" />
            </div>
          </Col>
        </Row>
      </Container>
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
