import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faAngleLeft);

export default function GoBackButton () {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1)
    } 
    return <Container>
          <Row className="mt-5 mb-5">
            <div onClick={handleGoBack} className="button btn-back">
              <FontAwesomeIcon icon="angle-left" size="2x" />
              Go Back
            </div>
          </Row>
        </Container>
  }