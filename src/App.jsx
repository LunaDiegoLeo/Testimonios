// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data'; // Supongamos que este es tu array
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './style.css';

export default function App() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  // 1. Verificación de Estado Vacío: Si no hay testimonios, mostramos un mensaje
  const hasTestimonios = testimonios && testimonios.length > 0;
  const length = hasTestimonios ? testimonios.length : 0;

  // Funciones de navegación (solo funcionan si hay datos)
  const next = () => hasTestimonios && setIndex(prev => (prev + 1) % length);
  const prev = () => hasTestimonios && setIndex(prev => (prev - 1 + length) % length);
  const random = () => {
    if (!hasTestimonios) return;
    let r = Math.floor(Math.random() * length);
    if (r === index) r = (r + 1) % length;
    setIndex(r);
  };

  // Autoplay
  useEffect(() => {
    // 2. Solo activar autoplay si hay testimonios
    if (!hasTestimonios) return;

    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  }, [hasTestimonios, length]); // Actualizar dependencias

  // Manejo de Interacción
  const handleUserAction = (actionFn) => {
    clearInterval(autoplayRef.current);
    actionFn();
    
    // Solo reiniciar si hay testimonios
    if (hasTestimonios) {
      autoplayRef.current = setInterval(() => {
        next();
      }, 5000);
    }
  };

  return (
    <main className="app">
      <h1>Testimonios</h1>
      
      {/* 3. Renderizado Condicional: Testimonial o Mensaje Vacío */}
      {hasTestimonios ? (
        <>
          <div className="card-wrapper" key={index}> 
            <Testimonial item={testimonios[index]} />
          </div>

          <Controls 
            onPrev={() => handleUserAction(prev)}
            onNext={() => handleUserAction(next)}
            onRandom={() => handleUserAction(random)}
          />

          <p className="counter">{index + 1} / {length}</p>
        </>
      ) : (
        // 4. Mensaje Informativo para el usuario
        <div className="empty-state">
          <p>No hay testimonios disponibles por el momento.</p>
        </div>
      )}
    </main>
  );
}