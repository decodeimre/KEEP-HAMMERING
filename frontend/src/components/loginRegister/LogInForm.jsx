import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });
 const [errorMessage, setErrorMessage] = useState(null)


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    setErrorMessage(null)
  };

  const handleLogin = async (e) => {
   
    e.preventDefault();
    try {
      const loginRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(loginInfo),
      };
      const URL = "http://localhost:3000/login";
      const response = await fetch(URL, loginRequest);

      if (!response.ok) {
        //to get to error message from backend: 
        const errorResponse = await response.json();
        const newErrorMessage = errorResponse.msg || 'unexpected error';
        //set errorMessage for display for user:
        setErrorMessage(newErrorMessage)
        throw new Error(newErrorMessage);
      }
      if (response.status === 200) {
        const userData = await response.json();

        login(userData.userObject);
        navigate(`/home`);
      }else {
        const loginError = await response.json().msg
        console.log(loginError)
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {errorMessage? <h3>{errorMessage}</h3> : null}
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleLoginChange}
          name="userName"
          value={loginInfo.userName}
          type="test"
          placeholder="your username"
          required
        />
      </Form.Group>

      <Form.Group required className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleLoginChange}
          name="password"
          value={loginInfo.password}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};
