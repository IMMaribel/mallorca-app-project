import { useState, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import beachFlashcard from "../assets/flashcards/beachcreeks.jpg";
import bellverFlashcard from "../assets/flashcards/bellver.jpg";
import palmanightFlashcard from "../assets/flashcards/palmanight.jpg";
import tramuntanaFlashcard from "../assets/flashcards/tramuntana.jpg";

const Flashcards = () => {
  const flashcardsData = [
    {
      id: 1,
      text: "Discover Mallorca's best beaches and creeks",
      image: beachFlashcard,
    },
    {
      id: 2,
      text: "Explore the Tramuntana mountains",
      image: tramuntanaFlashcard,
    },
    {
      id: 3,
      text: "Enjoy the vibrant nightlife in Palma",
      image: palmanightFlashcard,
    },
    {
      id: 4,
      text: "Visit the historic Bellver Castle",
      image: bellverFlashcard,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detectar deslizamiento
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext(); // Deslizar a la izquierda
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrevious(); // Deslizar a la derecha
    }
  };

  // Detectar arrastre con el ratón
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    touchEndX.current = e.clientX;
    handleSwipe();
  };

  // Mover a la siguiente flashcard
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  // Mover a la flashcard anterior
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  // Alternar favoritos
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <section className="p-4">
      <div
        className="relative h-64 w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {flashcardsData.map((card, index) => {
          // Calcular la posición de las tarjetas para superposición
          const isActive = currentIndex === index;
          const isNext = (index - currentIndex + flashcardsData.length) % flashcardsData.length === 1;

          return (
            <div
              key={card.id}
              className={`absolute h-full w-full rounded-lg shadow-md transition-transform duration-500 ${
                isActive
                  ? "z-10 scale-100 translate-x-0"
                  : isNext
                  ? "z-5 scale-90 translate-x-20"
                  : "z-0 scale-75 translate-x-40 opacity-50"
              }`}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
              <p className="z-10 text-white font-semibold text-base absolute bottom-8 left-4">
                {card.text}
              </p>
              <button
                onClick={() => toggleFavorite(card.id)}
                className="absolute top-4 right-4 z-10"
              >
                <FaHeart
                  className={`text-lg transition-transform duration-300 ${
                    favorites.includes(card.id)
                      ? "text-rose-500 scale-125"
                      : "text-white"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Flashcards;
