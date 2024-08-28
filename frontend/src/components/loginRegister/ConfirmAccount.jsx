import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";

export default function ConfirmAccount() {
  const { token, userID } = useParams();
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ConfirmAccount mounting')
    const verifyAccount = async () => {
      try {
        const URL = `https://keep-hammering.onrender.com/users/confirm/${token}/${userID}`;
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data)
    
        setMessage(data.msg);
        if (response.ok) setConfirmed(true);
      } catch (error) {
        console.log(error)
        setMessage("An error occured. Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    verifyAccount();
  }, [token, userID]);

  if (isLoading) {
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );
  }

  return (
    <Container className="text-center mt-5">
      <Row>
        <h2>{message}</h2>
      </Row>
      {confirmed && (
        <Row>
          <Button onClick={() => navigate("/")}>Back to Login</Button>
        </Row>
      )}
    </Container>
  );
}
