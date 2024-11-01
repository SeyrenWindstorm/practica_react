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
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8018/apiL/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Almacenar el token en localStorage
        localStorage.setItem('token', data.token);
        // Redirigir al usuario a la página principal o a otra ruta
        window.location.href = '/home'; // Cambia esto según tus rutas
      } else {
        console.error('Login failed:', data);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>
      {showRegister ? (
        <Register onClose={closeRegister} />
      ) : (
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Sign In</div>
          {showAlert && (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Incorrect username or password.
            </Alert>
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
          <Button
            className="w-100 login-btn"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
          <div>
            Don't have an account?
            <br />
            <Button
              className="w-100 register-btn"
              variant="secondary"
              type="button"
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
