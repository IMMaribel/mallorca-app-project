import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { updateUser } from "../features/profile/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({ general: "Both fields are required." });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        updateUser({
          name: user.displayName || "User",
          email: user.email,
          profilePicture: user.photoURL || "/assets/placeholder-profile.jpg",
        })
      );

      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrors({ general: "No account found with this email." });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ general: "Incorrect password." });
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
      console.error("Google Sign-In error:", error.message);
    }
  };

  const handleForgotPassword = async () => {
    setResetError("");
    setResetSuccess("");
    if (!resetEmail) {
      setResetError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess("Password reset email sent. Check your inbox!");
    } catch (error) {
      setResetError("Failed to send password reset email. Please try again.");
      console.error("Password reset error:", error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video de fondo */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="./src/assets/video/video1.mp4" type="video/mp4" />
      </video>

      {/* Header con logo */}
      <header className="absolute top-0 w-full bg-white bg-opacity-100 z-20 p-2 flex justify-center">
        <img src="./src/assets/Logo_def.png" alt="MallorcApp Logo" className="h-6" />
      </header>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col h-full bg-black bg-opacity-40 px-4 justify-center">
        <div className="relative w-full flex items-center -mt-28">
          <button
            onClick={() => navigate("/starter")}
            style={{ zIndex: 999, position: "relative" }}
            className="absolute left-0 text-white text-2xl font-semibold cursor-pointer sm:hidden"
          >
            <IoChevronBackSharp />
          </button>
          {/* Botón de la flecha alineado a la izquierda */}
          {/* Título centrado */}
          <h1 className="absolute w-full text-center text-2xl md:text-4xl font-bold text-white sm:-mt-32">
            Login
          </h1>
        </div>

        <form
          className="flex flex-col space-y-2 items-center justify-center mx-6 mt-10"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-sm bg-white bg-opacity-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}

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
          {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}

          {errors.general && <p className="text-red-500 text-sm mt-4">{errors.general}</p>}

                {/* Forgot Password */}
                <div className="w-full max-w-md text-right mt-2">
          <button
            className="text-blue-400 text-sm underline hover:text-gray-300"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </button>
        </div>

        {/* Modal de "Forgot Password" */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md flex-col">
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 rounded-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
              {resetSuccess && <p className="text-green-500 text-sm">{resetSuccess}</p>}
              <div className="flex flex-row justify-between">
              <button
                onClick={handleForgotPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send Reset Email
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="mt-4 text-blue-500 underline"
              >
                Close
              </button></div>
            </div>
          </div>
        )}

          <button
            type="submit"
            className="w-2/3 bg-white bg-opacity-90 text-black py-1 rounded-lg text-base font-semibold hover:bg-gray-300 transition"
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

        {/* Botones de inicio de sesión social */}
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <button
            className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-3" /> Continue with Google
          </button>
          {/* <button
            className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
            onClick={() => console.log("Facebook Sign-In")}
          >
            <FaFacebookF className="mr-3" /> Continue with Facebook
          </button>
          <button
            className="w-full flex items-center justify-center bg-white bg-opacity-60 text-black px-6 py-1 rounded-lg text-base font-semibold hover:bg-gray-200 transition"
            onClick={() => console.log("Apple Sign-In")}
          >
            <FaApple className="mr-3" /> Continue with Apple
          </button> */}
        </div>
        </div>
        {/* Enlace para crear cuenta */}
        <p className="mt-6 text-white text-sm text-end">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="underline text-blue-400 hover:text-gray-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
