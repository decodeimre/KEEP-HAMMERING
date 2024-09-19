import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DateContext } from "./context/dateContext";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import {
  faBars,
  faUser,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faBars, faUser, faPlus, faHome);

function MenuDropDownLeft() {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="custom-dropdown"
        as="button"
        id="dropdown-menu"
      >
        <FontAwesomeIcon icon="bars" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/home")}>
          Home (Calendar)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/workoutLog`)}>
          Plan new Workout
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Exercise Overview</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function MenuDropDownRight() {
  const { logout } = useContext(UserContext);

  return (
    <Dropdown>
      <Dropdown.Toggle as="button" id="dropdown-menu">
        <FontAwesomeIcon icon="user" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-1">My Workouts</Dropdown.Item>
        <Dropdown.Item href="#/action-2">My Stats</Dropdown.Item>
        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default function Header() {
  const location = useLocation();
  const { setCurrentDate } = useContext(DateContext);
  const { user, isLoggedIn } = useContext(UserContext);

  console.log(user, isLoggedIn);

  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
        
              <h1 className="app-logo">KEEP HAMMERING!</h1>
            
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
           {isLoggedIn &&  <MenuDropDownLeft />}
          </Col>
          <Col className="text-center">
            {isLoggedIn ? (
              <h3>Welcome, {user?.userName}</h3>
            ) : (
              <h3>Welcome!</h3>
            )}
          </Col>
          <Col>
            {isLoggedIn && <MenuDropDownRight />}
          </Col>
        </Row>
        {isLoggedIn && (
          <Row className="text-center mt-2 mb-3">
            <Col>
              {location.pathname === "/home" ? (
                <Link to="/workoutLog">
                  <Button
                    onClick={() => setCurrentDate(new Date())}
                    className="btn-workout-plus button"
                  >
                    <FontAwesomeIcon icon="plus" />
                  </Button>
                </Link>
              ) : (
                <Link to="/home">
                  <Button className="btn-home button p-0">
                    <FontAwesomeIcon icon="home" />
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
