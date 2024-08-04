import {
  ListGroupItem,
  Container,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the specific icons
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// Add the imported icons to the library
library.add(faEllipsisVertical);

export default function LoggedExercise({ exercise }) {
  console.log(exercise);
  const { exerciseName, unit, sets } = exercise;

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
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <h3></h3>
            </>
          );
        })}
      </Container>
    </ListGroupItem>
  );
}
