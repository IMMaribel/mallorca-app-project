import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({ general: "Both fields are required." });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);

      // Navegar a la página de inicio
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (error.code === "auth/user-not-found") {
        setErrors({ general: "No account found for this email." });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ general: "Incorrect password." });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
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
    </div>
  );
};

export default LoginPage;
