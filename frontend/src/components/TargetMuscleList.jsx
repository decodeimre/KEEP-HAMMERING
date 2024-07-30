import { Link } from "react-router-dom";
import { ListGroup, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faCircleDot, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faCircleDot, faAngleLeft);

function TargetMuscleList() {
  return (
    <>
      <Container>
        <ListGroup className="target-muscle-list">
          <Link to={`/workoutLog/targetMuscleList/Abs`}>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "red", marginRight: "2rem" }}
              />
            Abs
          </ListGroup.Item>
              </Link>
          <ListGroup.Item
            action
            bg-color=""
            variant="dark"
            className="target-muscle-item"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "blue", marginRight: "2rem" }}
            />
            Back
          </ListGroup.Item>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "yellow", marginRight: "2rem" }}
            />
            Biceps
          </ListGroup.Item>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "green", marginRight: "2rem" }}
            />
            Chest
          </ListGroup.Item>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "orange", marginRight: "2rem" }}
            />
            Legs
          </ListGroup.Item>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "purple", marginRight: "2rem" }}
            />
            Shoulders
          </ListGroup.Item>
          <ListGroup.Item action variant="dark" className="target-muscle-item">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "grey", marginRight: "2rem" }}
            />
            Triceps
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <Container>
        <Row className="mt-5">
          <div className="button btn-back">
            <FontAwesomeIcon icon="angle-left" size="2x" />
            Go Back
          </div>
        </Row>
      </Container>
    </>
  );
}

export default TargetMuscleList;
