import { useState, useEffect } from "react";

import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";

const slides = [Slide1, Slide2, Slide3];

export default function Inicio() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((c) => (c + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const CurrentSlide = slides[current];

  return (
    <div className="fixed inset-0 overflow-hidden">

      <CurrentSlide />

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 
        bg-black/50 px-4 py-2 rounded-full text-white z-30 
        hover:bg-black/70 transform hover:scale-110 transition duration-300"
      >
        ⟨
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 
        bg-black/50 px-4 py-2 rounded-full text-white z-30 
        hover:bg-black/70 transform hover:scale-110 transition duration-300"
      >
        ⟩
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-4 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition duration-300 
            ${i === current ? "bg-white scale-125 shadow-lg" : "bg-white/40 hover:scale-110"}`}
          />
        ))}
      </div>
    </div>
  );
}
