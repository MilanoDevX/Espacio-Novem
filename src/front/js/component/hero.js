import React from "react";
import "../../styles/hero.css";
import consultories from "../../img/hero2.webp";

export const Hero = () => {
  
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,   // mueve la ventana hacia abajo una altura de viewport
      behavior: 'smooth',
    });
  };

  return (
    <div className="hero-container">
      <div className="image-container">
        <div className="title-hero">
          <h1 className="title">PsicoEspacio</h1>
          <h3>Alquiler de espacios profesionales</h3>
        </div>
        <img
          className="imageconsultories img-fluid"
          src={consultories}
          alt="Consultorio"
        />
        
        <button
          onClick={handleScroll}
          className="scroll-button"
          aria-label="Scroll down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
};
