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

export function NewWorkout() {
  const [date, setDate] = useState(new Date());

  let selectedDate = date.toDateString();

  const goOneDayBack = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const goOneDayForward = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  return (
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
      <Row>
        <div className="d-flex justify-content-center align-items-center empty-workout-log">
          <h1>Workout Log Empty</h1>
        </div>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="workout-plus ">
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
  );
}

// <div className="d-flex"></div>
// <ul className="list-group muscleList">
//   <li className="list-group-item">Abs</li>
//   <li className="list-group-item">Back</li>
//   <li className="list-group-item">Biceps</li>
//   <li className="list-group-item">Chest</li>
//   <li className="list-group-item">Legs</li>
//   <li className="list-group-item">Shoulders</li>
//   <li className="list-group-item">Triceps</li>
// </ul>
