import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig'; // Importar la configuración de Firebase
import { useDispatch, useSelector } from 'react-redux';
import { addStory } from '../features/stories/storiesSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MyStory = () => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const myStories = useSelector((state) =>
    state.stories.categories.find((cat) => cat.name === "My Story")?.stories || []
  );

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);

      // Subir la imagen a Firebase Storage
      try {
        setUploading(true);
        // Crear una referencia en Firebase Storage
        const storageRef = ref(storage, `stories/${file.name}`);
        // Subir el archivo a la referencia creada
        await uploadBytes(storageRef, file);
        // Obtener la URL de descarga de la imagen subida
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Image URL:", downloadURL);

        // Despachar la acción para agregar la URL al estado de Redux
        dispatch(
          addStory({
            categoryName: "My Story", // Nombre de la categoría
            story: {
              id: Date.now(), // ID único basado en timestamp
              title: file.name, // Nombre del archivo como título
              image: downloadURL, // URL de descarga de Firebase
            },
          })
        );
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="cursor-pointer flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className={`w-20 h-20 rounded-full border-2 p-0.5 border-[#f06292] flex items-center justify-center overflow-hidden ${uploading ? 'animate-pulse' : ''}`}>
          {uploading ? (
            <span className="text-xs font-medium">Uploading...</span>
          ) :  myStories.length > 0 ?  (
            <img src={myStories[myStories.length - 1].image} alt="My Story" className="w-full h-full object-cover rounded-full p-0.5" />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-300">
              <span className="text-5xl text-gray-500 font-light mb-3">+</span>
            </div>
          )}
        </div>
        <span className="text-xs font-medium mt-2 text-gray-500">My Story</span>
      </label>
    </div>
  );
};

export default MyStory;
