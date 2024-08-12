import { Link } from "react-router-dom";
import { ListGroup, Container, Row } from "react-bootstrap";
import GoBackButton from './utils/GoBackButton.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faCircleDot, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faCircleDot, faAngleLeft);

function TargetMuscleList() {
  //for now working with fixed array of muscle and color - later putting it into the data (targetMuscle gets fixed color)
  const muscleArray = [
    "Abs",
    "Back",
    "Biceps",
    "Chest",
    "Legs",
    "Shoulders",
    "Triceps",
  ];
  const colorArray = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
    "grey",
  ];

  return (
    <>
      <Container>
        <ListGroup className="target-muscle-list">
          {muscleArray.map((muscle, index) => {
            return (
              <Link key={index} to={`/workoutLog/${muscle}/exercises`} style={{textDecoration: 'none'}}>
                <ListGroup.Item
                  action
                  variant="dark"
                  className="target-muscle-item"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-dot"
                    style={{ color: colorArray[index], marginRight: "2rem" }}
                  />
                  {muscle}
                </ListGroup.Item>
              </Link>
            );
          })}
        </ListGroup>
      </Container>
     <GoBackButton/>
    </>
  );
}

export default TargetMuscleList;


