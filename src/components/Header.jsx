import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../features/language/languageSlice'; // Importar la acción
import PropTypes from 'prop-types'; 
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoLanguage } from "react-icons/io5";
import LogoApp from '../assets/Logo_def.png';
import LogoDark from '../assets/Logo_darkm.png';

const Header = ({ toggleTheme, isDarkTheme }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language); // Obtener el estado del idioma

  // Función para alternar entre inglés y español
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    dispatch(changeLanguage(newLanguage));
  };

  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center space-x-2">
        <IoLanguage className="text-xl cursor-pointer" onClick={handleLanguageChange} />
        <span className="text-sm font-semibold">
          {currentLanguage === 'en' ? 'En' : 'Es'}
        </span>
      </div>
      <div className="flex justify-center">
        {isDarkTheme ? <img src={LogoDark} alt="MallorcApp" className="h-8" /> : <img src={LogoApp} alt="MallorcApp" className="h-8" />}
      </div>
      <button onClick={toggleTheme} className="flex items-center">
        {isDarkTheme ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>
    </header>
  );
};

Header.propTypes = {
    toggleTheme: PropTypes.func.isRequired, // toggleTheme debe ser una función y es requerido
    isDarkTheme: PropTypes.bool.isRequired, // isDarkTheme debe ser un booleano y es requerido
};
export default Header;
