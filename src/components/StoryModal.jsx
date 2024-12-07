import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types"; 
import { useDispatch, useSelector } from "react-redux";
import { closeModal, markCategoryAsViewed } from "../features/stories/storiesSlice";

const StoryModal = ({ imageMap }) => {
  const dispatch = useDispatch();

  // Estado global para las categorías activas
  const { isModalOpen, categories, activeCategory } = useSelector((state) => state.stories);

  // Estados locales para controlar las historias y categorías
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(activeCategory || 0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    if (activeCategory !== null) {
      setCurrentCategoryIndex(activeCategory);
      setCurrentStoryIndex(0); 
    }
  }, [activeCategory]);

  // Categoría actual y su historia actual
  const currentCategory = categories[currentCategoryIndex];
  const currentStory = currentCategory?.stories[currentStoryIndex];

  // Cerrar el modal
  const handleClose = useCallback(() => {
    dispatch(markCategoryAsViewed(currentCategoryIndex));
    dispatch(closeModal());
    setCurrentCategoryIndex(0);
    setCurrentStoryIndex(0);
  }, [dispatch, currentCategoryIndex]);

  // Avanzar a la siguiente historia
  const nextStory = useCallback(() => {
    if (currentStoryIndex < currentCategory.stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      // Avanzar a la siguiente categoría
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      // Si no hay más historias ni categorías, cierra el modal
      handleClose();
    }
  }, [
    currentStoryIndex,
    currentCategoryIndex,
    currentCategory?.stories.length,
    categories.length,
    handleClose,
  ]);

  // Retroceder a la historia anterior
  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    } else if (currentCategoryIndex > 0) {
      // Retroceder a la categoría anterior
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
      setCurrentStoryIndex(categories[currentCategoryIndex - 1].stories.length - 1);
    }
  };

  // Avance automático de historias
  useEffect(() => {
    const timer = setTimeout(nextStory, 3000);
    return () => clearTimeout(timer);
  }, [nextStory]);

  if (!isModalOpen || !currentStory) {
    return null; 
  }

  const imageSrc = imageMap[currentStory.id];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onTouchStart={(e) => e.touches[0]?.clientY > 200 && handleClose()} 
    >
      <div className="relative w-full max-w-lg mx-auto p-4 rounded-md text-white">
        {/* Imagen actual */}
        <div
          className="relative w-full h-[400px] flex items-center justify-center"
          onClick={(e) => {
            const clickX = e.clientX;
            const width = window.innerWidth;
            if (clickX < width / 2) {
              previousStory(); 
            } else {
              nextStory();
            }
          }}
        >
          <img
            src={imageSrc}
            alt={currentStory.title}
            className="w-full h-full object-cover rounded-md"
          />
          <h2 className="absolute bottom-4 left-4 text-lg font-bold">{currentStory.title}</h2>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white p-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

StoryModal.propTypes = {
    imageMap: PropTypes.object.isRequired,
  };

export default StoryModal;