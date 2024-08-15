import { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faPlus);
import DateSelecter from "./DateSelecter.jsx";
import { DateContext } from "./context/dateContext.jsx";
import { currentExerciseContext } from "./context/currentExerciseContext.jsx";
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import DateFormat from "./utils/DateFormatter.jsx";
import LoggedExercise from "./LoggedExercise.jsx";

export function DailyWorkoutLog() {
  const [dailyWorkouts, setDailyWorkouts] = useState([]); // save all workouts of THAT day for display and edit
  const navigate = useNavigate();
  const { date } = useContext(DateContext);
  const { state, dispatch } = useContext(currentExerciseContext);
  const {isNewWorkout, setIsNewWorkout} = useContext(newWorkoutContext)

  useEffect(() => {
    const dateQuery = DateFormat(date);
    const fetchURL = `http://localhost:3000/workoutLog/?date=${dateQuery}`;

    async function fetchWorkoutSets() {
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log(data)
        setDailyWorkouts(data); //array of all logged exercises of that day
      } catch (err) {
        alert("connection to the server failed");
      }
    }
    fetchWorkoutSets();
    setIsNewWorkout(false);
  }, [date, navigate, isNewWorkout]);

  const handleAddWorkoutClick = () => {
    navigate("targetMuscleList");
  };

  return (
    <>
      <DateSelecter />
      {/*Outlet is for targetMuscleList OR ExerciseList OR ExerciseLog*/}
      <Outlet /> 

      {dailyWorkouts.length !== 0 && (
        <Container>
          <Col>
            <ListGroup>
              {dailyWorkouts.map((exercise, index) => {
                return <LoggedExercise exercise={exercise} key={index} />;
              })}
            </ListGroup>
          </Col>
        </Container>
      )}
      {dailyWorkouts.length === 0 && (
        <Container>
          <Row>
            <div className="d-flex justify-content-center align-items-center empty-workout-log">
              <h1>Workout Log Empty</h1>
            </div>
          </Row>
        </Container>
      )}
      {/* {location.pathname === "/workoutLog" && ( */}
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
      {/* )} */}
    </>
  );
}
