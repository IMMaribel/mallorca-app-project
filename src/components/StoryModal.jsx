import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, markCategoryAsViewed } from "../features/stories/storiesSlice";

const StoryModal = ({ imageMap }) => {
  const dispatch = useDispatch();

  // Obtener estado global
  const { categories, activeCategory, isModalOpen } = useSelector((state) => state.stories);

  // Estado local para controlar la navegación de historias
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(activeCategory || 0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Efecto para inicializar índices cuando se abre el modal
  useEffect(() => {
    if (activeCategory !== null) {
      setCurrentCategoryIndex(activeCategory);
      setCurrentStoryIndex(0);
    }
  }, [activeCategory]);

  // Cerrar el modal
  const handleClose = useCallback(() => {
    dispatch(markCategoryAsViewed(currentCategoryIndex));
    dispatch(closeModal());
    setCurrentCategoryIndex(0);
    setCurrentStoryIndex(0);
  }, [dispatch, currentCategoryIndex]);

  // Función para avanzar a la siguiente historia
  const nextStory = useCallback(() => {
    const currentCategory = categories[currentCategoryIndex];

    if (currentStoryIndex < currentCategory.stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      handleClose(); // Cierra el modal si no hay más historias
    }
  }, [currentStoryIndex, currentCategoryIndex, categories, handleClose]);

  // Función para retroceder a la historia anterior
  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
      setCurrentStoryIndex(categories[currentCategoryIndex - 1].stories.length - 1);
    }
  }, [currentStoryIndex, currentCategoryIndex, categories]);

  // Avance automático
  useEffect(() => {
    const timer = setTimeout(nextStory, 3000);
    return () => clearTimeout(timer);
  }, [nextStory]);

  // Evitar errores si no hay historias o categorías válidas
  if (!isModalOpen) return null;

  const currentCategory = categories[currentCategoryIndex];
  const currentStory = currentCategory?.stories[currentStoryIndex];

  if (!currentStory) return null;

  const imageSrc = imageMap[currentStory.id];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onTouchStart={(e) => e.touches[0]?.clientY > 200 && handleClose()}
    >
      <div className="relative w-full max-w-lg mx-auto p-4 rounded-md text-white">
        {/* Contenedor de la historia */}
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

        {/* Botón para cerrar */}
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
