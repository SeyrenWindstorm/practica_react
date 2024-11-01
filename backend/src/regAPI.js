const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Carga las variables de entorno de .env

const app = express();
const PORT = 8001;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes desde este origen
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middleware
app.use(bodyParser.json());

// Esquema de usuario
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Endpoint para registrar usuario
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Crea un nuevo usuario en MongoDB
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});