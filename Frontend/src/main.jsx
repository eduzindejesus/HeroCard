import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MarvelProvider } from "./contexts/MarvelContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <MarvelProvider>
        <App />
      </MarvelProvider>
    </AuthProvider>
  </BrowserRouter>
);
