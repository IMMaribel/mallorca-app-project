import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Stories from '../components/Stories';
import { setStories } from '../features/stories/storiesSlice';
import Flashcards from '../components/Flashcards';
import NewsSection from '../components/NewsSection';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const dispatch = useDispatch();
  // Estado para tema oscuro/claro
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // Estado del idioma desde Redux
  const currentLanguage = useSelector((state) => state.language.language);
  // Obtener las historias del estado global
  const stories = useSelector((state) => state.stories.stories);

  // Función para alternar el tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Simular la carga de historias al cargar la página
  useEffect(() => {
    // Datos de ejemplo para las historias
    const fetchedStories = [
      { imageUrl: 'https://via.placeholder.com/150' },
      { imageUrl: 'https://via.placeholder.com/150' },
      { imageUrl: 'https://via.placeholder.com/150' },
    ];
    dispatch(setStories(fetchedStories));
  }, [dispatch]);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {currentLanguage === 'en' ? 'Inspire Me' : 'Inspírame'}
        </h1>
      </div>
      <Stories stories={stories} />
      <Flashcards />
      <NewsSection />
      <Navbar />
    </div>
  );
};

export default HomePage;
