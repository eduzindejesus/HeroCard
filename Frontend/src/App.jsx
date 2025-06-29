import { Routes, Route, Navigate } from "react-router-dom";
import HeroCardList from "./components/HeroCardList.jsx";
import HeroDetails from "./components/HeroDetails.jsx";
import LoginPage from "./components/LoginPage.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import AddHeroPage from './components/AddHeroPage.jsx';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><HeroCardList /></PrivateRoute>} />
        <Route path="/hero/:id" element={<PrivateRoute><HeroDetails /></PrivateRoute>} />
        <Route path="/adicionar" element={<PrivateRoute><AddHeroPage /></PrivateRoute>} /> {/* nova rota */}
      </Routes>
    </div>
  );
}

export default App;
