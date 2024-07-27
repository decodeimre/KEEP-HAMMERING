import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import {
 faCircleDot
    
} from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faCircleDot);

function TargetMuscleList() {
  return (
    <ListGroup className="target-muscle-list">
      <ListGroup.Item action variant="dark" className="target-muscle-item">
      <FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "red", marginRight: "2rem"}}/>
        Abs
        </ListGroup.Item>
      <ListGroup.Item action bg-color="" variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "blue", marginRight: "2rem"}}/>Back</ListGroup.Item>
      <ListGroup.Item action variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "yellow", marginRight: "2rem"}}/>Biceps</ListGroup.Item>
      <ListGroup.Item action variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "green", marginRight: "2rem"}}/>Chest</ListGroup.Item>
      <ListGroup.Item action variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "orange", marginRight: "2rem"}}/>Legs</ListGroup.Item>
      <ListGroup.Item action variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "purple", marginRight: "2rem"}}/>Shoulders</ListGroup.Item>
      <ListGroup.Item action variant="dark" className="target-muscle-item"><FontAwesomeIcon icon="fa-solid fa-circle-dot" style={{color: "grey", marginRight: "2rem"}}/>Triceps</ListGroup.Item>
    </ListGroup>
  );
}

export default TargetMuscleList;