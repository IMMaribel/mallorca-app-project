import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const myStories = useSelector((state) =>
    state.stories.categories.find((cat) => cat.name === "My Story")?.stories || []
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-lg mx-auto p-4">
        <section className="mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture || "/assets/placeholder-profile.jpg"}
              alt="User Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name || "Guest"}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Sección Favoritos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You haven&apos;t added any favorites yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
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

        {/* Sección Mis Historias */}
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">My Stories</h2>
          {myStories.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You haven&apos;t added any stories yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myStories.map((story) => (
                <div key={story.id} className="rounded-lg shadow">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-medium">{story.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Navbar />
      </div>
    </div>
  );
};

export default ProfilePage;
