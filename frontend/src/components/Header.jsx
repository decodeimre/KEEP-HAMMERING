import Dropdown from "react-bootstrap/Dropdown";
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
        <Dropdown.Item onClick={() => navigate('/home')}>Home (Calendar)</Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/workoutLog`)}>
          Plan new Workout
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Exercise Overview</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function MenuDropDownRight() {
  return (
    <Dropdown>
      <Dropdown.Toggle as="button" id="dropdown-menu">
        <FontAwesomeIcon icon="user" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-1">My Workouts</Dropdown.Item>
        <Dropdown.Item href="#/action-2">My Stats</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default function Header() {
  const location = useLocation();
  const { setCurrentDate } = useContext(DateContext);
  const { user, isLoggedIn } = useContext(UserContext);

  console.log(user, isLoggedIn)

  return (
    <>
      <div className="container-fluid bg-dark text-white p-3">
        <div className="row">
          <div className="col text-center">
            <h1 className="app-logo">KEEP HAMMERING!</h1>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            {isLoggedIn ? (
              <h2>Welcome, {user?.userName}</h2>
            ) : (
              <h2>Welcome!</h2>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <div className="row mt-3">
            <div className="col-2 text-center">
              <MenuDropDownLeft />
            </div>

            <div className="col-8 text-center">
              {location.pathname === "/home" ? (
                <Link to="/workoutLog">
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="btn-workout-plus button"
                  >
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </Link>
              ) : (
                <Link to="/home">
                  <button className="btn-home button">
                    <FontAwesomeIcon icon="home" />
                  </button>
                </Link>
              )}
            </div>
            <div className="col-2 text-center">
              <MenuDropDownRight />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
