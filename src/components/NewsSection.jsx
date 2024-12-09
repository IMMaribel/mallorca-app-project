import { useState, useRef } from "react";
import useFetchNews from "../hooks/useFetchNews";
import PropTypes from "prop-types";

const NewsSection = ({ isDarkTheme }) => {
  const { news, loading } = useFetchNews(
    "https://newsapi.org/v2/everything?q=Mallorca&language=en&apiKey=97dd0f6b65834dcc98238b37a1337c29"
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detectar inicio del deslizamiento táctil o de arrastre
  const handleStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Detectar final del deslizamiento táctil o de arrastre
  const handleEnd = (e) => {
    touchEndX.current = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;
    handleSwipe();
  };

  // Determinar si el deslizamiento es hacia la derecha o izquierda
  const handleSwipe = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) {
      handleNext(); // Deslizar a la izquierda
    } else if (deltaX < -50) {
      handlePrevious(); // Deslizar a la derecha
    }
  };

  // Cambiar a la siguiente noticia
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  // Cambiar a la noticia anterior
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className={`flex items-center justify-center relative overflow-hidden h-[393px] sm:h-[500px] mt-[-20px] sm:mt-0 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      {loading ? (
        <p className="text-gray-500">Loading news...</p>
      ) : news.length === 0 ? (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-500">
          <p className="text-gray-500">No news available.</p>
        </div>
      ) : (
        <div className="relative w-full h-full overflow-hidden">
          {news.map((article, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ${
                currentIndex === index
                  ? "translate-x-0"
                  : index > currentIndex
                  ? "translate-x-full"
                  : "translate-x-[-100%]"
              }`}
              style={{
                transform:
                  currentIndex === index
                    ? "translateX(0)"
                    : index > currentIndex
                    ? "translateX(100%)"
                    : "translateX(-100%)",
              }}
            >
              <div className="w-11/12 max-w-lg bg-blue-200 bg-opacity-40 dark:bg-gray-300 rounded-xl shadow-lg p-4 flex flex-col items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-60 md:h-[400px]"
                >
                  <img
                    src={article.urlToImage || "../assets/Logo_starter.png"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </a>
                <div className="mt-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-bold text-lg md:text-xl hover:underline ${
                      isDarkTheme ? "text-white" : "text-black"
                    }`}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

NewsSection.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
};

export default NewsSection;
