import { ListGroupItem, Container, Col, Row, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { exerciseSetContext } from "./context/exerciseSetContext.jsx";
import { selectedExerciseContext } from "./context/selectedExerciseContext.jsx";
import { DateContext } from "./context/dateContext.jsx";
import { useContext, useState } from "react";
import DateFormat from "./utils/DateFormatter.jsx";

export default function LoggedExercise({ exercise }) {
  const [update, setUpdate] = useState(false); // for showing update Button or not
  const { selectedExercise, setSelectedExercise } = useContext(
    selectedExerciseContext
  );
  const { date } = useContext(DateContext);
  const { sets } = exercise;
  const { currentSet, setCurrentSet } = useContext(exerciseSetContext);
  const { setIsNewWorkout } = useContext(newWorkoutContext);

  // delete a set
  const handleDeleteSet = async (id) => {
    try {
      const deleteRequest = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setID: id, exerciseLogID: exercise._id }),
      };
      const deleteSet = await fetch(
        `http://localhost:3000/workoutLog/exercise-log/delete-set/`,
        deleteRequest
      );
      if (!deleteSet.ok) {
        throw new Error("failed to delete set");
      }
      setIsNewWorkout(true);
    } catch (err) {
      console.log(err);
      alert("handleDelete error");
    }
  };

  // select set to update
  const handleUpdateSelect = async (id) => {
    const dateQuery = DateFormat(date);
    const fetchURL = `http://localhost:3000/workoutLog/exercise-log/update-set/${id}/?date=${dateQuery}`;

    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log(data) // gives back the right data
      setSelectedExercise({
        exerciseName: data.exerciseName,
        targetMuscle: data.targetMuscle,
      });
      const set = data.sets.filter((set) => set._id === id)[0];
      console.log(set); //gives back the right data
      setCurrentSet({
        weight: set.weight,
        reps: set.reps,
        unit: set.unit,
      });

      setUpdate(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  // const handleSetUpdate = async () => {
  //     try {
  //       const updateRequest = {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           setID: id,
  //           exerciseLogID: exercise._id,
  //           updatedSet: currentSet,
  //         }),
  //       };
  //       const updatedSet = await fetch(
  //         `http://localhost:3000/workoutLog/exercise-log/update-set/`,
  //         updateRequest
  //       );
  //       if (!updatedSet.ok) {
  //         throw new Error("response for update not okay");
  //       }
  //       setIsNewWorkout(true);
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   };

  return (
    <ListGroupItem>
      <Container>
        <Row>
          <Col>
            <h3>
              {exercise.exerciseName} (weight in {sets[0].unit}){" "}
            </h3>
          </Col>
          <Col className="text-end">
            <Dropdown>
              <Dropdown.Toggle variant className="custom-dropdown">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>SETS</Col>
          <Col>WEIGHT</Col>
          <Col>REPS</Col>
          <Col></Col>
        </Row>
        {sets.map((set, index) => {
          return (
            <>
              <Row key={index} className="bg-info pt-2">
                <Col>
                  <h5>{index + 1}</h5>
                </Col>
                <Col>{set.weight}</Col>
                <Col>{set.reps}</Col>
                <Col className="text-end">
                  <Dropdown>
                    <Dropdown.Toggle variant className="custom-dropdown">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleUpdateSelect(set._id)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteSet(set._id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </>
          );
        })}
      </Container>
    </ListGroupItem>
  );
}
