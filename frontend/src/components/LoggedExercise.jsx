import { ListGroupItem, Container, Col, Row, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);
import { newWorkoutContext } from "./context/newWorkoutContext.jsx";
import { useContext, useEffect } from "react";
import { set } from "mongoose";


export default function LoggedExercise({ exercise }) {
  const { exerciseName, unit, sets } = exercise;
  const {setIsNewWorkout} = useContext(newWorkoutContext)


  useEffect(() => {
    return setIsNewWorkout(false)
  },[setIsNewWorkout])


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
      setIsNewWorkout(true)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ListGroupItem>
      <Container>
        <Row>
          <Col>
            <h3>{exerciseName} </h3>
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
              <Row className="bg-info pt-2">
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
                      <Dropdown.Item>Edit</Dropdown.Item>
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
