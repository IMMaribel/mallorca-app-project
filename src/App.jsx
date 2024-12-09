import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
