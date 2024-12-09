import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const ProfilePage = ({ isDarkTheme, currentLanguage }) => {
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const myStories = useSelector((state) =>
    state.stories.categories.find((cat) => cat.name === "My Story")?.stories || []
  );

  // Traducciones según el idioma
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

  const t = translations[currentLanguage || "en"]; // Traducción actual

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-screen-lg mx-auto p-4">
        {/* Perfil de Usuario */}
        <section className="mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture || "/assets/placeholder-profile.jpg"}
              alt="User Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name || "Guest"}</h1>
              <p className="text-gray-600 dark:text-gray-200">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Favoritos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t.myFavorites}</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">{t.noFavorites}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg shadow-md ${
                    isDarkTheme ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <img
                    src={item.image || "/assets/placeholder.jpg"}
                    alt={item.text}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <p className="mt-2 text-center">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Mis Historias */}
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">{t.myStories}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myStories.map((story) => (
              <div
                key={story.id}
                className={`rounded-lg shadow ${
                  isDarkTheme ? "bg-gray-700" : "bg-white"
                }`}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <Navbar />
    </div>
  );
};

ProfilePage.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  currentLanguage: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default ProfilePage;
