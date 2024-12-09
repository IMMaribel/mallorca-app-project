import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/starter");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img
        src="./src/assets/LogoLoadingP.png"
        alt="MallorcApp"
        className="w-30 h-30 animate-pulse"
      />
    </div>
  );
};

export default LoadingPage;
