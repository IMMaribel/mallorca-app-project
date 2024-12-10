import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { updateUser } from "../features/profile/userSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "An email is required.";
    } else if (!email.includes("@") || !email.match(/.+@.+\..+/)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      }
      if (!/\d/.test(password)) {
        newErrors.password = "The password must include at least one number.";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password =
          "Password must include at least one special character.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateInputs()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        updateUser({
          name: user.displayName || "New User",
          email: user.email,
          profilePicture: user.photoURL || "/assets/placeholder-profile.jpg",
        })
      );

      navigate("/home");
    } catch (error) {
      console.error("Error registering:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered." });
      } else if (error.code === "auth/invalid-email") {
        setErrors({ email: "Please enter a valid email." });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password too weak." });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        updateUser({
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        })
      );

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

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

      {/* Header con logo */}
      <header className="absolute top-0 w-full bg-white bg-opacity-100 z-20 p-2 flex justify-center">
        <img
          src="./src/assets/Logo_def.png"
          alt="MallorcApp Logo"
          className="h-6"
        />
      </header>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col h-full bg-black bg-opacity-40 mt-10 px-4 justify-center">
        <div className="relative w-full flex items-center -mt-24">
          {/* Botón de la flecha alineado a la izquierda */}
          <button
            onClick={() => navigate("/starter")}
            style={{ zIndex: 999, position: "relative" }}
            className="text-white text-2xl font-semibold cursor-pointer sm:hidden"
          >
            <IoChevronBackSharp />
          </button>
          {/* Título centrado */}
          <h1 className="absolute w-full text-center text-2xl md:text-4xl font-bold text-white sm:-mt-32">
            Register
          </h1>
        </div>

        <form
          className="flex flex-col space-y-2 items-center justify-center mx-6 mt-10"
          onSubmit={handleRegister}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-sm bg-white bg-opacity-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 overflow-auto">
              {errors.email}
            </p>
          )}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-sm bg-white bg-opacity-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 overflow-auto">
              {errors.password}
            </p>
          )}

          <button
            type="submit"
            className="w-2/3 bg-white bg-opacity-90 text-black py-1 rounded-lg text-base font-semibold hover:bg-gray-300 transition"
          >
            Register
          </button>
        </form>

  <div className="flex flex-col items-center justify-center">
    {/* Línea de separación */}
    <div className="flex items-center my-6 w-full max-w-md">
      <hr className="flex-grow border-gray-300" />
      <span className="px-4 text-white">or</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    {/* Botones de registro social */}
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <button
        className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
        onClick={handleGoogleSignIn}
      >
        <FaGoogle className="mr-3" /> Continue with Google
      </button>
      {/* <button
        className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
        onClick={() => console.log("Facebook Sign-Up")}
      >
        <FaFacebookF className="mr-3" /> Continue with Facebook
      </button>
      <button
        className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
        onClick={() => console.log("Apple Sign-Up")}
      >
        <FaApple className="mr-3" /> Continue with Apple
      </button> */}
    </div>

  {/* Enlace para iniciar sesión */}
    <p className="mt-6 text-white text-sm">
      Already have an account?{" "}
      <button
        onClick={() => navigate("/login")}
        className="underline text-blue-400 hover:text-gray-300"
      >
        Login
      </button>
    </p>
  </div>
        {/* Política de privacidad */}
        <p className="mt-24 sm:mt-4 text-gray-400 text-xs text-center px-2">
          By continuing, you agree to the{" "}
          <span className="underline">Terms of Use</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
