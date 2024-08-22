import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext.jsx";
import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'

export const LoginForm = () => {
    const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      };
      const URL = "http://localhost:3000/login";
      const response = await fetch(URL, loginRequest);
      if(!response.ok) {
        throw new Error('fetch response for login not okay')
      }
      const userData = await response.json();
      login(userData.userObject);
      navigate(`/${userData.userObject._id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
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
