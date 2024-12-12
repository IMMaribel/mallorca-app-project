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
      {/* Contenedor del modal */}
      <div className="relative w-full h-full">
        {/* Título y botón de cierre */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-2 py-2 bg-black bg-opacity-20">
          <h2 className="text-base font-semibold text-white">{currentCategory?.name || "Category"}</h2>
          <button
            onClick={handleClose}
            className="text-white text-2xl font-bold hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Imagen ajustada */}
        <div className="w-full h-full flex items-center justify-center"
            onClick={(e) => {
              const clickX = e.clientX;
              const width = window.innerWidth;
              if (clickX < width / 2) {
                previousStory();
              } else {
                nextStory();
              }
            }}>
          <img
            src={imageSrc}
            alt={currentStory.title}
            className="w-auto h-auto object-cover"
          />
        </div>
      </div>
    </div>

  );
};

StoryModal.propTypes = {
  imageMap: PropTypes.object.isRequired,
};

export default StoryModal;
