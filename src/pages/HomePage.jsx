import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Stories from '../components/Stories';
import { setStories } from '../features/stories/storiesSlice';
import Flashcards from '../components/Flashcards';
import NewsSection from '../components/NewsSection';
import Navbar from '../components/Navbar';
import sightsImage from '../assets/stories/sights1.jpg';
import experienceImage from '../assets/stories/experience1.jpg';
import artsImage from '../assets/stories/arts1.jpg';
import shoppingImage from '../assets/stories/shopping1.jpg';
import foodImage from '../assets/stories/food1.jpg';
import hotelsImage from '../assets/stories/hotel1.jpg';
import attractionsImage from '../assets/stories/atractions1.jpg';


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

  // Simular la carga de historias
  useEffect(() => {
    // Datos historias
    const fetchedStories = [
        { imageUrl: sightsImage, title: 'Sights' },
        { imageUrl: experienceImage, title: 'Experience' },
        { imageUrl: artsImage, title: 'Arts' },
        { imageUrl: shoppingImage, title: 'Shopping' },
        { imageUrl: foodImage, title: 'Food' },
        { imageUrl: hotelsImage, title: 'Hotels' },
        { imageUrl: attractionsImage, title: 'Attractions' },
      ];      
    dispatch(setStories(fetchedStories));
  }, [dispatch]);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Stories stories={stories} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {currentLanguage === 'en' ? 'Inspire Me' : 'Inspírame'}
        </h1>
      </div>
      <Flashcards />
      <NewsSection />
      <Navbar />
    </div>
  );
};

export default HomePage;
