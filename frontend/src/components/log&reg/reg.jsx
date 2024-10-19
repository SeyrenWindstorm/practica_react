// src/components/register/reg.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // Para reCAPTCHA v3

const Register = ({ onClose }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha(); // Para usar reCAPTCHA v3

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica si reCAPTCHA está disponible
    if (!executeRecaptcha) {
      console.log("Recaptcha not yet available");
      return;
    }

    // Ejecutar reCAPTCHA y obtener el token
    const token = await executeRecaptcha("register"); // 'register' es la acción que defines
    if (!token) {
      setShow(true);
      return;
    }

    // URL del API para verificar el captcha
    const API_URL = "http://localhost:8071/api/verify-captcha";

    // Enviar el token al backend para verificarlo
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (!data.success) {
        setShow(true);
        return;
      }

      console.log("Captcha verified successfully!");

      setLoading(true);
      // Simulación de una pequeña demora
      await delay(500);
      console.log(`Username: ${inputUsername}, Password: ${inputPassword}, Email: ${inputEmail}`);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error during verification:", error);
      setShow(true);
    }
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
      <div className="h4 mb-2 text-center">Register</div>
      {show && (
        <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
          Captcha verification failed. Please try again.
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
      <Form.Group className="mb-2" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={inputEmail}
          placeholder="Email"
          onChange={(e) => setInputEmail(e.target.value)}
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
      <Form.Group className="mb-2" controlId="password-confirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={inputPassword}
          placeholder="Confirm Password"
          onChange={(e) => setInputPassword(e.target.value)}
          required
        />
      </Form.Group>

      <form onSubmit={handleSubmit}>
      <ReCAPTCHA
        sitekey="6LdTA2YqAAAAAJkNuflDy00nSKlKOSY1TXOBQut5"
        onChange={handleCaptcha}
      />
      <button type="submit">Submit</button>
    </form>
        

      {!loading ? (
        <Button className="w-100 register-btn" variant="primary" type="submit">
          Register
        </Button>
      ) : (
        <Button className="w-100 register-btn" variant="primary" disabled>
          Registering...
        </Button>
      )}
      <div className="d-grid justify-content-end">
        <Button className="text-muted px-0" variant="link" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default Register;
