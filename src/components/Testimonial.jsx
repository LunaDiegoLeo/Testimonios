// src/components/Testimonial.jsx
import React, { useState } from 'react'; // Necesitamos useState para rastrear el error

export default function Testimonial({ item }) {
  // 1. Verificación básica: Si no hay item, no renderizamos nada (o un error)
  if (!item) {
    return (
      <article className="testimonial-card error-state">
        <p>No hay datos disponibles para este testimonio.</p>
      </article>
    );
  }

  // 2. Estado local para manejar si la foto falla
  const [fotoError, setFotoError] = useState(false);

  const { nombre, cargo, texto, foto } = item;

  // 3. Fallbacks de Datos (para evitar errores de undefined)
  const displayName = nombre || "Usuario Anónimo";
  const displayCargo = cargo || "Cliente Satisfecho";
  const displayText = texto || "Este usuario no ha dejado un comentario aún.";

  // 4. Fallback de Imagen: Usar una URL por defecto si 'foto' no existe o falla
  // Puedes usar una URL real o un placeholder de color.
  const placeholderFoto = `https://api.dicebear.com/8.x/initials/svg?seed=${displayName}`; // Placeholder dinámico con iniciales
  const displayFoto = (foto && !fotoError) ? foto : placeholderFoto;

  return (
    <article className="testimonial-card">
      <img 
        src={displayFoto} 
        alt={`Foto de ${displayName}`} 
        className="testimonial-photo"
        // 5. Manejo del Error de Carga de Imagen (onErrror)
        onError={() => setFotoError(true)} 
      />
      
      <h3 className="testimonial-name">{displayName}</h3>
      <p className="testimonial-role">{displayCargo}</p>
      
      {/* 6. Diseño Simple: Usar comillas tipográficas directamente */}
      <p className="testimonial-text">“{displayText}”</p>
    </article>
  );
}