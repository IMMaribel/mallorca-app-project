import { useState, useEffect } from "react";
import { FaHome, FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Manejar la visibilidad 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false); // Ocultar navbar al hacer scroll hacia abajo
      } else {
        setIsVisible(true); // Mostrar navbar al hacer scroll hacia arriba
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-white dark:bg-gray-800 flex justify-around items-center p-4 shadow-lg rounded-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <FaHome className="text-2xl text-sky-700 hover:text-sky-500 transition" />
      <FaCalendarAlt className="text-2xl text-gray-400 hover:text-sky-500 transition" />
      <FaMapMarkerAlt className="text-2xl text-gray-400 hover:text-sky-500 transition" />
      <FaUser className="text-2xl text-gray-400 hover:text-sky-500 transition" />
    </nav>
  );
};

export default Navbar;
