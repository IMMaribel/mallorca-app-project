import { useNavigate } from "react-router-dom";

const StarterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="./src/assets/video/video1.mp4" type="video/mp4" />
      </video>

      {/* Header con el logo */}
      <header className="absolute top-0 w-full bg-white bg-opacity-9100 z-20 p-2 flex justify-center">
        <img
          src="./src/assets/Logo_def.png"
          alt="MallorcApp Logo"
          className="h-6"
        />
      </header>

      {/* Contenido superpuesto */}
      <div className="relative z-10 flex flex-col items-center justify-evenly h-full bg-black bg-opacity-40">
        <h1 className="text-xl md:text-4xl font-semibold text-white text-center -mt-20">
          Explore Mallorca, <br />
          the most beautiful island in Spain
        </h1>
        <h2 className="text-sm md:text-lg text-white text-center -mt-36">
          Join us for an unforgettable experience. <br />
          Plan your escape now.
        </h2>

        {/* Botones de acción */}
        <div className="flex flex-col space-y-4 w-3/4 md:w-1/3">
          <button
            className="bg-blue-600 bg-opacity-55 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-white bg-opacity-50 text-black px-6 py-2 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarterPage;
