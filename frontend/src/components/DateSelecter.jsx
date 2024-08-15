import { useContext } from "react";
import { DateContext } from "./context/dateContext.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faAngleLeft, faAngleRight);

export default function DateSelecter() {
  const { date, goOneDayBack, goOneDayForward } = useContext(DateContext);
  let selectedDate = date.toDateString();

  return (
    <Container className="p-3">
      <Row className="justify-content-md-center border-bottom">
        <Col className="col-2 d-flex justify-content-start">
          <div onClick={goOneDayBack} className="button change-day-arrow">
            <FontAwesomeIcon icon="angle-left" size="3x" />
          </div>
        </Col>
        <Col className="d-flex justify-content-center col-8">
          <h2 className="selected-date">
            {selectedDate === new Date().toDateString()
              ? "Today"
              : selectedDate}
          </h2>
        </Col>
        <Col className="col-2 d-flex justify-content-end">
          <div onClick={goOneDayForward} className="button change-day-arrow">
            <FontAwesomeIcon icon="angle-right" size="3x" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
