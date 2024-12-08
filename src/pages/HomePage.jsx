import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Stories from "../components/Stories";
import StoryModal from "../components/StoryModal";
import Flashcards from "../components/Flashcards";
import NewsSection from "../components/NewsSection";
import Navbar from "../components/Navbar";
import sights1 from "../assets/stories/sights1.jpg";
import sights2 from "../assets/stories/sights2.jpg";
import sights3 from "../assets/stories/sights3.jpg";
import experience1 from "../assets/stories/experience1.jpg";
import experience2 from "../assets/stories/experience2.jpg";
import experience3 from "../assets/stories/experience3.jpg";
import arts1 from "../assets/stories/arts1.jpg";
import arts2 from "../assets/stories/arts2.jpg";
import atractions1 from "../assets/stories/atractions1.jpg";
import atractions2 from "../assets/stories/atractions2.jpg";
import food1 from "../assets/stories/food1.jpg";
import food2 from "../assets/stories/food2.jpg";
import food3 from "../assets/stories/food3.jpg";
import hotel1 from "../assets/stories/hotel1.jpg";
import hotel2 from "../assets/stories/hotel2.jpg";
import shopping1 from "../assets/stories/shopping1.jpg";
import shopping2 from "../assets/stories/shopping2.jpg";

const imageMap = {
  1: sights1,
  2: sights2,
  3: sights3,
  4: experience1,
  5: experience2,
  6: experience3,
  7: arts1,
  8: arts2,
  9: shopping1,
  10: shopping2,
  11: food1,
  12: food2,
  13: food3,
  14: hotel1,
  15: hotel2,
  16: atractions1,
  17: atractions2
};

const HomePage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentLanguage = useSelector((state) => state.language.language);
  const categories = useSelector((state) => state.stories.categories);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      {/* Solo pasamos las categorías al componente Stories */}
      <Stories categories={categories} imageMap={imageMap} />
      <StoryModal imageMap={imageMap} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {currentLanguage === "en" ? "Inspire Me" : "Inspírame"}
        </h1>
      </div>
      <Flashcards />
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {currentLanguage === "en" ? "News" : "Noticias"}
        </h1>
      </div>
      <NewsSection />
      <div className="p-4">
        <h2 className="text-2xl font-bold">
          Reddit
        </h2>
      </div>
      <Navbar />
    </div>
  );
};

export default HomePage;
