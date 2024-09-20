// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear la aplicación de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // Para procesar JSON en las solicitudes

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/cuestionario', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error conectando a MongoDB:', err);
});

// Definir el esquema de respuestas
const RespuestaSchema = new mongoose.Schema({
    seccion: String,
    pregunta: String,
    respuesta: mongoose.Schema.Types.Mixed,  // Permitir número o texto
});

// Modelo para las respuestas
const Respuesta = mongoose.model('Respuesta', RespuestaSchema);

// Ruta para crear una respuesta
app.post('/respuestas', async (req, res) => {
    const { seccion, pregunta, respuesta } = req.body;

    // Validar que respuesta no esté vacía
    if (respuesta === undefined || respuesta === null) {
        return res.status(400).json({ error: 'La respuesta no puede estar vacía' });
    }

    try {
        const nuevaRespuesta = new Respuesta({ seccion, pregunta, respuesta });
        await nuevaRespuesta.save();
        res.status(201).json(nuevaRespuesta);
    } catch (error) {
        console.error('Error al guardar la respuesta:', error);
        res.status(500).json({ error: 'Error al guardar la respuesta' });
    }
});

// Ruta para obtener todas las respuestas
app.get('/respuestas', async (req, res) => {
    try {
        const respuestas = await Respuesta.find();
        res.json(respuestas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las respuestas' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
