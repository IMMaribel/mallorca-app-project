import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { updateUser } from "../features/profile/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({ general: "Ambos campos son obligatorios." });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        updateUser({
          name: user.displayName || "Usuario",
          email: user.email,
          profilePicture: user.photoURL || "/assets/placeholder-profile.jpg",
        })
      );

      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrors({ general: "No se encontró ninguna cuenta con este email." });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ general: "La contraseña es incorrecta." });
      } else {
        setErrors({ general: "Algo salió mal. Intenta nuevamente." });
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

      navigate("/profile");
    } catch (error) {
      console.error("Error con Google Sign-In:", error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <form
        className="relative z-10 flex flex-col items-center justify-center h-full px-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-bold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg bg-white bg-opacity-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg bg-white bg-opacity-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full max-w-md bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Login
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
          <button
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
          </button>
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
    </div>
  );
};

export default LoginPage;
