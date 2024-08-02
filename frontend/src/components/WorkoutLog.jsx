import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Row, Col, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faPlus);
import DateSelecter from "./DateSelecter.jsx";
import { DateContext } from "./context/dateContext.jsx";
import DateFormat from "./DateFormatter.jsx";

export function WorkoutLog() {
  const [isNewWorkout, setIsNewWorkout] = useState(false);
  const [workoutSets, setWorkoutSets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = useContext(DateContext);

  useEffect(() => {
    const dateQuery = DateFormat(date);
    const fetchURL = `http://localhost:3000/workoutLog/?date=${dateQuery}`;

    async function fetchWorkoutSets() {
      console.log(dateQuery);
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        setWorkoutSets(data);
      } catch (err) {
        console.log("an error occured during data fetching");
      }
    }
    fetchWorkoutSets();
  }, [date, navigate]);

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
      <Outlet />

      {workoutSets.length !== 0 && !isNewWorkout && (
        <Container>
          <Col>
            <ListGroup>
              {workoutSets.map((set, index) => {
                return (
                  <ListGroupItem key={index}>
                    <h3>{set.exercise}</h3>
                    <h4>
                      Weight: {set.weight} {set.unit}
                    </h4>
                    <h4>Reps: {set.reps}</h4>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Container>
      )}
      {workoutSets.length === 0 && !isNewWorkout && (
        <Container>
          <Row>
            <div className="d-flex justify-content-center align-items-center empty-workout-log">
              <h1>Workout Log Empty</h1>
            </div>
          </Row>
        </Container>
      )}
      {!isNewWorkout && (
        <Container>
          <Row>
            <Col className="d-flex justify-content-center mt-5">
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
