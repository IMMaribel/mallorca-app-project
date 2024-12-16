import { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineRight } from "react-icons/ai";
import {  FaCalendarAlt, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const CarouselInfo = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Configuración del carrusel
  const settings = {
    infinite: false, // No reinicia el carrusel al final
    arrows: false, // Oculta las flechas de navegación
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true, // Permite arrastrar con el mouse
    touchMove: true, // Permite deslizar con el dedo en pantallas táctiles
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Actualiza el estado
  };

  // Datos de las diapositivas
  const slides = [
    {
      image: "src/assets/carousel/carousel1.jpg",
      title: "Plan your Trip",
      text: (
        <>
          Add attractions to this trip by tapping <FaHeart className="inline text-red-500 mr-2" />
          to save them and access your trips from your personal profile.
        </>
      ),
    },
    {
      image: "src/assets/carousel/carousel2.jpg",
      title: "Near Me",
      text: (
        <>
          Find your favorite attractions and events <FaMapMarkerAlt className="inline text-blue-500" /> 
          all across the island.
        </>
      ),
    },
    {
      image: "src/assets/carousel/carousel3.jpg",
      title: "Browse Events",
      text: (
        <>
          Make the most of your Mallorca experience with upcoming events in your 
          <FaCalendarAlt className="inline text-green-500 ml-2" />.
        </>
      ),
    },
  ];

  return (
    <div className="relative h-screen">
      {/* Header con logo */}
      <div className="absolute top-0 w-full bg-white bg-opacity-100 z-20 p-2 flex justify-center">
        <img src="src/assets/Logo_def.png" alt="MallorcaApp Logo" className="h-8" />
      </div>

      {/* Carrusel */}
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen">
            {/* Botón Skip en la esquina superior derecha */}
            <button
              onClick={() => navigate("/home")}
              className="absolute top-14 right-4 z-30 text-white bg-black bg-opacity-20 hover:bg-opacity-10 px-4 py-2 rounded-lg flex items-center"
            >
              Skip <AiOutlineRight className="ml-1" />
            </button>
            {/* Imagen de fondo */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Texto en la parte inferior */}
            <div className="absolute bottom-32 left-4 right-4 text-white text-left">
              <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
              <p className="text-lg">{slide.text}</p>
            </div>
            {/* Puntos del carrusel */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
              <ul className="flex space-x-2">
                {slides.map((_, i) => (
                  <li
                    key={i}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      currentSlide === i ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselInfo;
