import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export const RegisterForm = () => {
  const [registerInfo, setRegisterInfo] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [message, setMessage] = useState(null);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
    setMessage(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerInfo.password !== registerInfo.passwordConfirm) {
        setMessage({text: "Passwords don't match", color: 'red'});
        return;
      }

      const registerRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerInfo),
      };
      const URL = "http://localhost:3000/register";
      const response = await fetch(URL, registerRequest);
      console.log(response);
      if (!response.ok) {
        //to get to error message from backend:
        const errorResponse = await response.json();
        const newErrorMessage = errorResponse.errors[0].msg || "unexpected error";
        //set errorMessage for display for user:
        setMessage({text: newErrorMessage, color: 'red'});
        throw new Error(newErrorMessage);
      }
      if (response.status === 200) {
        const register = await response.json();
        console.log(register)
        setMessage({text: register.msg, color: 'green'});
      } else {
        const registerError = await response.json().msg;
        console.log(registerError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      {message ? <h3 style={{color: message.color}}>{message.text}</h3> : null}
      <Form.Group className="mb-3" controlId="formUserNameReg">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleRegisterChange}
          name="userName"
          value={registerInfo.userName}
          type="test"
          placeholder="Choose a username"
        />
        <Form.Text className="text-muted">
          No spaces or special characters! Use a-z and 0-9!
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmailReg">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={handleRegisterChange}
          name="email"
          value={registerInfo.email}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll (try) to never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordReg">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleRegisterChange}
          name="password"
          value={registerInfo.password}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPasswordRepeat">
        <Form.Label>confirm password</Form.Label>
        <Form.Control
          onChange={handleRegisterChange}
          name="passwordConfirm"
          value={registerInfo.passwordConfirm}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};
