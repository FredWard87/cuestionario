import React, { useState } from 'react';
import axios from 'axios';
import './css/cuesti.css';

// Definimos las preguntas y las posibles respuestas.
const preguntas = [
    { 
        seccion: "Entendimiento", 
        pregunta: "¿Consideras que una aplicación de salud mental debe ser clara y fácil de entender desde el primer uso?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Entendimiento", 
        pregunta: "¿Cuán importante es para ti que una aplicación de salud mental utilice términos comprensibles y directos en sus opciones y menús?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Facilidad de aprendizaje", 
        pregunta: "¿Piensas que una aplicación para encontrar psicólogos debería ser fácil de aprender a usar, incluso para personas que no están familiarizadas con la tecnología?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Facilidad de aprendizaje", 
        pregunta: "¿Cuánto tiempo crees que debería tomar para que un nuevo usuario aprenda a usar todas las funciones de una aplicación enfocada en la salud mental?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Operabilidad", 
        pregunta: "¿Qué tan importante es para ti que una aplicación para buscar psicólogos sea intuitiva y no requiera instrucciones complejas para su uso?", 
        tipo: "Siempre-TalVez-Nunca" 
    },
    { 
        seccion: "Operabilidad", 
        pregunta: "¿Consideras que sería útil que una aplicación permita realizar acciones como buscar disponibilidad de psicólogos o agendar citas de manera rápida y sin complicaciones?", 
        tipo: "Siempre-TalVez-Nunca" 
    },
    { 
        seccion: "Atractivo", 
        pregunta: "¿Qué tan relevante te parece que una aplicación de salud mental sea visualmente atractiva, en lugar de solo funcional?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Atractivo", 
        pregunta: "¿Crees que un buen diseño gráfico influiría en tu decisión de usar una aplicación para encontrar psicólogos?", 
        tipo: "1-5" 
    },
    { 
        seccion: "Conformidad de uso", 
        pregunta: "¿Consideras que una aplicación de salud mental debe ser consistente en su diseño y funcionamiento en todas sus secciones, como la búsqueda de psicólogos y la agenda de citas?", 
        tipo: "Siempre-TalVez-Nunca" 
    },
    { 
        seccion: "Conformidad de uso", 
        pregunta: "¿Qué tan importante es para ti que la experiencia de uso en una aplicación de este tipo sea fluida y sin errores?", 
        tipo: "1-5" 
    },
];

const Cuestionario = () => {
    const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));

    const handleChange = (index, value) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[index] = value;
        setRespuestas(nuevasRespuestas);
    };

    const enviarRespuestas = () => {
        preguntas.forEach((pregunta, index) => {
            axios.post('https://cuestionario-km55.onrender.com/respuestas', {
                seccion: pregunta.seccion,
                pregunta: pregunta.pregunta,
                respuesta: respuestas[index],
            }).then((res) => {
                console.log('Respuesta guardada:', res.data);
            }).catch((err) => console.log(err));
        });

        // Limpiar los campos después de enviar
        setRespuestas(Array(preguntas.length).fill(""));
    };

    const renderOpciones = (tipo, index) => {
        if (tipo === "1-5") {
            return (
                <select onChange={(e) => handleChange(index, e.target.value)} value={respuestas[index]}>
                    <option value="">Selecciona una opción</option>
                    <option value="1">1 (Malo)</option>
                    <option value="2">2 (Medianamente malo)</option>
                    <option value="3">3 (Regular)</option>
                    <option value="4">4 (Bueno)</option>
                    <option value="5">5 (Excelente)</option>
                </select>
            );
        } else if (tipo === "Siempre-TalVez-Nunca") {
            return (
                <select onChange={(e) => handleChange(index, e.target.value)} value={respuestas[index]}>
                    <option value="">Selecciona una opción</option>
                    <option value="Siempre">Siempre</option>
                    <option value="Tal vez">Tal vez</option>
                    <option value="Nunca">Nunca</option>
                </select>
            );
        }
    };

    return (
        <div>
            <h1>Cuestionario de Usabilidad</h1>
            <p>Califica del 1 al 5, donde 1 es "Malo" y 5 es "Excelente".</p>
            {preguntas.map((pregunta, index) => (
                <div key={index}>
                    <h3>{pregunta.pregunta}</h3>
                    {renderOpciones(pregunta.tipo, index)}
                </div>
            ))}
            <button onClick={enviarRespuestas}>Enviar respuestas</button>
        </div>
    );
};

export default Cuestionario;
