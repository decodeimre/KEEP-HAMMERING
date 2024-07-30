import { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faPlus);
import DateSelecter from "./DateSelecter.jsx";

export function WorkoutDisplay() {
  const [isNewWorkout, setIsNewWorkout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/workoutLog") {
      setIsNewWorkout(false);
    } else {
      setIsNewWorkout(true);
    }
  }, [location.pathname]);

  const handleAddWorkoutClick = () => {
    setIsNewWorkout(true);
    navigate("targetMuscleList");
  };

  return (
    <>
      <DateSelecter />

      {isNewWorkout ? (
        <Outlet />
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
                onClick={handleAddWorkoutClick}
                className="button workout-plus "
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
