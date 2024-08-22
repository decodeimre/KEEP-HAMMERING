import { Button, Form, Tabs, Tab } from "react-bootstrap";

import { useState } from "react";

export default function LoginRegister() {
  const [register, setRegister] = useState(false);

  return (
    <>
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab eventKey="register" title="Register">
          <RegisterForm />
        </Tab>
      </Tabs>
    </>
  );
}

const LoginForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="test" placeholder="your username" />
      </Form.Group>

      <Form.Group required className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

const RegisterForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUserNameReg">
        <Form.Label>Username</Form.Label>
        <Form.Control type="test" placeholder="Choose a username" />
        <Form.Text className="text-muted">
          No spaces or special characters! Use a-z and 0-9!
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmailReg">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll (try) to never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordReg">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPasswordRepeat">
        <Form.Label>confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};
