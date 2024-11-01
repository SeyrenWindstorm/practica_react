import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Register = ({ onClose }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carga el script de reCAPTCHA cuando se monta el componente
    const loadRecaptcha = () => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6LdTA2YqAAAAAJkNuflDy00nSKlKOSY1TXOBQut5";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica si las contraseñas coinciden
    if (inputPassword !== inputConfirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Verifica que reCAPTCHA esté disponible
    if (!window.grecaptcha) {
      console.error("reCAPTCHA no cargado");
      return;
    }

    // Ejecuta reCAPTCHA v3 y obtiene el token
    window.grecaptcha.ready(async function () {
      const token = await window.grecaptcha.execute(
        "6LdTA2YqAAAAAJkNuflDy00nSKlKOSY1TXOBQut5",
        { action: "register" }
      );

      console.log("Token de reCAPTCHA:", token); // Token generado

      // Envía los datos del formulario y el token al backend
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputUsername,
            email: inputEmail,
            password: inputPassword,
            token: token,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          setShowError(true); // Muestra error si la verificación falla
        } else {
          console.log("Usuario registrado con éxito!");
          onClose(); // Cierra el formulario si el registro fue exitoso
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
      <div className="h4 mb-2 text-center">Registro</div>
      {showError && (
        <Alert className="mb-2" variant="danger" onClose={() => setShowError(false)} dismissible>
          Error en la verificación de Captcha o en el registro. Inténtalo de nuevo.
        </Alert>
      )}
      <Form.Group className="mb-2" controlId="username">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="text"
          value={inputUsername}
          placeholder="Nombre de usuario"
          onChange={(e) => setInputUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="email">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          value={inputEmail}
          placeholder="Correo electrónico"
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          value={inputPassword}
          placeholder="Contraseña"
          onChange={(e) => setInputPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="password-confirm">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          type="password"
          value={inputConfirmPassword}
          placeholder="Confirmar Contraseña"
          onChange={(e) => setInputConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>

      {!loading ? (
        <Button className="w-100 register-btn" variant="primary" type="submit">
          Registrarse
        </Button>
      ) : (
        <Button className="w-100 register-btn" variant="primary" disabled>
          Registrando...
        </Button>
      )}
      <div className="d-grid justify-content-end">
        <Button className="text-muted px-0" variant="link" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default Register;
