import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Register from './reg'; // Asegúrate de la ruta correcta
import "./log.css";

import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }
    setLoading(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      {showRegister ? (
        <Register onClose={closeRegister} />
      ) : (
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          {/* Header */}
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Sign In</div>
          {/* Alert */}
          {show ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              Incorrect username or password.
            </Alert>
          ) : (
            <div />
          )}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="checkbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          {!loading ? (
            <Button className="w-100 login-btn" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-100 login-btn" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
          <div>
            Don't have an account?
            <br />
            <Button
              className="w-100 register-btn"
              variant="secondary"
              type="button" // Cambiar a type="button" para evitar el envío del formulario
              onClick={handleRegister}
            >
              Register 
              
            </Button>
          </div>
          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={() => { /* lógica para restablecer la contraseña */ }}
            >
              Forgot password?
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Login;
