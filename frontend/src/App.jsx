import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
