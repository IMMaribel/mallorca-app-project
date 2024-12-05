import { FaHome, FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white flex justify-around items-center p-4 shadow-md">
      <FaHome className="text-2xl text-primary" />
      <FaCalendarAlt className="text-2xl text-gray-400" />
      <FaMapMarkerAlt className="text-2xl text-gray-400" />
      <FaUser className="text-2xl text-gray-400" />
    </nav>
  );
};

export default Navbar;
