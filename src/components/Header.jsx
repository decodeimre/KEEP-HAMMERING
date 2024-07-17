import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons you need
import { faBars, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "react-bootstrap";

// Add the imported icons to the library
library.add(faBars, faUser, faPlus);

function MenuDropDownLeft() {
  return (
    <Dropdown>
      <Dropdown.Toggle as="button" id="dropdown-menu">
        <FontAwesomeIcon icon="bars" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function Header() {
  return (
    <div className="container-fluid bg-dark text-white p-3">
      <div className="row">
        <div className="col text-center">
          <h1 className="app-logo">KEEP HAMMERING</h1>
        </div>
      </div>
      {/*navigation with button burger-menu, welcome text, button user-menu*/}
      <div className="row">
        <div className="col-2 text-center">
          <MenuDropDownLeft />
        </div>
        <div className="col-8 text-center">
          <h2>Welcome, User!</h2>
        </div>
        <div className="col-2 text-center">
          <MenuDropDownRight/>
        </div>
      </div>
    </div>
  );
}
