import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './css/resu.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Resultados = () => {
    const [respuestas, setRespuestas] = useState([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('Entendimiento');

    useEffect(() => {
        // Obtener las respuestas desde el backend
        axios.get('https://cuestionario-km55.onrender.com/respuestas')
            .then((res) => {
                setRespuestas(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const secciones = [
        "Entendimiento",
        "Facilidad de aprendizaje",
        "Operabilidad",
        "Atractivo",
        "Conformidad de uso"
    ];

    const agruparPorSeccion = (seccion) => {
        return respuestas.filter(r => r.seccion === seccion);
    };

    const agruparPorPregunta = (preguntasSeccion) => {
        return preguntasSeccion.reduce((acc, curr) => {
            acc[curr.pregunta] = acc[curr.pregunta] || [];
            acc[curr.pregunta].push(curr.respuesta);
            return acc;
        }, {});
    };

    const renderGrafica = (respuestasPregunta) => {
        const conteo = respuestasPregunta.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(conteo),
            datasets: [
                {
                    label: 'Conteo de Respuestas',
                    data: Object.values(conteo),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        };
    };

    const preguntasSeccion = agruparPorSeccion(seccionSeleccionada);
    const respuestasPorPregunta = agruparPorPregunta(preguntasSeccion);

    return (
        <div className="resultados-container">
            <h1>Resultados por Sección</h1>
            <label htmlFor="seccion-select">Selecciona una sección:</label>
            <select 
                id="seccion-select" 
                value={seccionSeleccionada} 
                onChange={(e) => setSeccionSeleccionada(e.target.value)}
            >
                {secciones.map((seccion) => (
                    <option key={seccion} value={seccion}>{seccion}</option>
                ))}
            </select>

            {Object.entries(respuestasPorPregunta).map(([pregunta, respuestas], index) => (
                <div key={index} className="grafica">
                    <h2>{pregunta}</h2>
                    <Bar 
                        data={renderGrafica(respuestas)} 
                        options={{ 
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 5, // Establece el máximo en 5
                                }
                            }
                        }} 
                    />
                </div>
            ))}
        </div>
    );
};

export default Resultados;
