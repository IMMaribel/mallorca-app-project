import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentLanguage, setCurrentLanuage] = useState("en");

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isDarkTheme={isDarkTheme}
                  toggleTheme={toggleTheme}
                  currentLanguage={currentLanguage}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  isDarkTheme={isDarkTheme}
                  currentLanguage={currentLanguage}
                />
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
