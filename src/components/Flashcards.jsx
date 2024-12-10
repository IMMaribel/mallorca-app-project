import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { addFavorite } from "../features/profile/favoritesSlice";
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

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrevious();
    }
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    touchEndX.current = e.clientX;
    handleSwipe();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  const handleToggleFavorite = (card) => {
    dispatch(addFavorite(card));
  };

  return (
    <section className="p-8 overflow-hidden">
      <div
        className="relative h-64 w-full max-w-full flex items-center justify-center overflow-hidden  sm:h-[500px] mt-[-20px] sm:mt-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {flashcardsData.map((card, index) => {
          const isActive = currentIndex === index;

          return (
            <div
              key={card.id}
              className={`absolute lg:static lg:w-auto h-full w-9/12 sm:w-80 rounded-lg shadow-md transition-transform duration-500  ${
                isActive ?  "z-10 scale-100 translate-x-0"
                  : "z-0 scale-75 translate-x-14 opacity-50 lg:opacity-100 lg:scale-100 lg:translate-x-0"
              }`}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
              <p className=" text-white font-semibold text-base absolute bottom-8 left-4 right-2">
                {card.text}
              </p>
              <button
                onClick={() => handleToggleFavorite(card)}
                className="absolute top-4 right-4 z-10"
              >
                <FaHeart
                  className={`text-lg transition-transform duration-300 ${
                    favorites.some((fav) => fav.id === card.id)
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
