import { Form, Button } from "react-bootstrap";

export const RegisterForm = () => {
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