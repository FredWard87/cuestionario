// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cuestionario from './Components/Cuestionario/cuestionario';
import Resultados from './Components/Cuestionario/resultados';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Cuestionario />} />
                    <Route path="/resultados" element={<Resultados />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

