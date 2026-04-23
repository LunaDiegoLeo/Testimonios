// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './style.css';

export default function App() {
    const [index, setIndex] = useState(0);
    const length = testimonios.length;
    const autoplayRef = useRef(null);

    // Funciones de navegación
    const next = () => setIndex(prev => (prev + 1) % length);
    const prev = () => setIndex(prev => (prev - 1 + length) % length);
    const random = () => {
        let r = Math.floor(Math.random() * length);
        if (r === index) r = (r + 1) % length; // evitar mismo índice
        setIndex(r);
    };

    // Autoplay: cambia cada 5s
    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            next();
        }, 5000);

        // Limpieza al desmontar el componente
        return () => clearInterval(autoplayRef.current);
    }, [length]);

    // Pausar autoplay al interactuar (por accesibilidad / UX)
    const handleUserAction = (actionFn) => {
        clearInterval(autoplayRef.current); // Detener el intervalo actual
        actionFn(); // Ejecutar la acción (prev, next o random)

        // Reiniciar el autoplay después de la interacción
        autoplayRef.current = setInterval(() => {
            next();
        }, 5000);
    };

    return (
        <main className="app">
            <h1>Testimonios</h1>

            <div className="card-wrapper" key={index}>
                <Testimonial item={testimonios[index]} />
            </div>

            <Controls
                onPrev={() => handleUserAction(prev)}
                onNext={() => handleUserAction(next)}
                onRandom={() => handleUserAction(random)}
            />

            <p className="counter">{index + 1} / {length}</p>
        </main>
    );
}