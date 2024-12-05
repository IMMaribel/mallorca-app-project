import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Stories from '../components/Stories';
import Flashcards from '../components/Flashcards';
import NewsSection from '../components/NewsSection';
import Navbar from '../components/Navbar';

const HomePage = () => {
  // Estado para tema oscuro/claro
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // Estado del idioma desde Redux
  const currentLanguage = useSelector((state) => state.language.language);

  // Función para alternar el tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {currentLanguage === 'en' ? 'Inspire Me' : 'Inspírame'}
        </h1>
      </div>
      <Stories />
      <Flashcards />
      <NewsSection />
      <Navbar />
    </div>
  );
};

export default HomePage;

