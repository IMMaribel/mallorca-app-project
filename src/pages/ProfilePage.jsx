import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logoutUser } from "../features/profile/userSlice";
import { FaHeart } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser } from "../features/profile/userSlice";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

const ProfilePage = ({ isDarkTheme, currentLanguage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const myStories = useSelector((state) =>
    state.stories.categories.find((cat) => cat.name === "My Story")?.stories || []
  );

  const [selectedStory, setSelectedStory] = useState(null);

  const translations = {
    en: {
      myProfile: "My Profile",
      myFavorites: "My Favorites",
      myStories: "My Stories",
      noFavorites: "You haven't added any favorites yet.",
    },
    es: {
      myProfile: "Mi Perfil",
      myFavorites: "Mis Favoritos",
      myStories: "Mis Historias",
      noFavorites: "Aún no has añadido favoritos.",
    },
  };

  const t = translations[currentLanguage || "en"];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const providerId = currentUser.providerData[0]?.providerId;
        dispatch(
          updateUser({
            name:
              providerId === "google.com"
                ? currentUser.displayName || currentUser.email.split("@")[0]
                : currentUser.email.split("@")[0],
            email: currentUser.email || "",
            profilePicture:
              providerId === "google.com"
                ? currentUser.photoURL
                : "src/assets/M.png",
            uid: currentUser.uid,
          })
        );
      }
    });
  
    return () => unsubscribe(); // Limpia el listener al desmontar
  }, [dispatch]);
    
  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-screen-lg p-4">
        <button
          data-tooltip-id="logoutTooltip"
          onClick={handleLogout}
          className=" dark:text-white text-xl hover:text-red-500 transition"
        >
         <IoIosLogOut />
        </button>
        <Tooltip id="logoutTooltip" content="Logout" place="top" />

      {/* Encabezado del perfil */}
      <section className="mb-10 text-center">
        <div className="relative inline-block">
          <img
            src={
              user.profilePicture ||
              "src/assets/M.png"
            }
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">
          {user.name || "Guest"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {user.email || ""}
        </p>
      </section>

        {/* Favoritos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaHeart className="text-rose-600 mr-2 size-5" />
            {t.myFavorites}
          </h2>
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">{t.noFavorites}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className={`relative rounded-lg overflow-hidden shadow-md transition transform hover:scale-105 ${
                    isDarkTheme ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <img
                    src={item.image || "/assets/placeholder.jpg"}
                    alt={item.text}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center px-2">{item.text}</p>
                </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Historias del usuario */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AiOutlinePlusCircle className="text-[#00bcd4] mr-2 size-5" />
            {t.myStories}
          </h2>
          {myStories.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              {currentLanguage === "en"
                ? "You haven't uploaded any stories yet."
                : "No has subido ninguna historia aún."}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {myStories.map((story) => (
                <div
                  key={story.id}
                  className="relative rounded-lg overflow-hidden shadow-md transition transform hover:scale-105"
                  onClick={() => setSelectedStory(story)}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-40 object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal para historias */}
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedStory.image}
              alt={selectedStory.title}
              className="w-full h-auto object-cover"
            />
            <button
              className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
              onClick={() => setSelectedStory(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};

ProfilePage.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  currentLanguage: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default ProfilePage;