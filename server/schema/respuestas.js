const mongoose = require('mongoose');

// Definir el esquema de respuestas
const RespuestaSchema = new mongoose.Schema({
    seccion: { type: String, required: true },
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true }, // Puede ser texto o número
});

// Modelo para las respuestas
const Respuesta = mongoose.model('Respuesta', RespuestaSchema);
