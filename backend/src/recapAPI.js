const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8071;
app.use(cors()); // Habilita CORS para todas las rutas

// Middleware
app.use(bodyParser.json());

// Clave secreta de reCAPTCHA
const RECAPTCHA_SECRET_KEY = '6LdTA2YqAAAAABh7Drrpoqdtdwj1jMP5KyuPvL_y';

// Endpoint para verificar el captcha
app.post('/api/verify-captcha', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  try {
    // Verifica el token con Google
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const { success } = response.data;

    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'Captcha verification failed' });
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
