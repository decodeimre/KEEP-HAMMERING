import { Tabs, Tab, Container } from "react-bootstrap";
import { RegisterForm } from "./RegisterForm.jsx";
import { LoginForm } from "./LogInForm.jsx";

export default function LoginRegister() {
  return (
    <>
      <Container className="loginRegisterContainer">
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
      </Container>
    </>
  );
}
