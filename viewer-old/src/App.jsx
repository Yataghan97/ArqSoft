import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AuthModal from "./components/AuthModal";
import GamesPage from "./pages/GamesPage";

function App() {
  const [authMode, setAuthMode] = useState(null);
  const openLogin = () => setAuthMode("login");
  const openRegister = () => setAuthMode("register");
  const closeModal = () => setAuthMode(null);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Header onLogin={openLogin} onRegister={openRegister} />
      {authMode && <AuthModal mode={authMode} onClose={closeModal} />}
      <Routes>
        <Route path="/" element={<Hero onLogin={openLogin} onRegister={openRegister} />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;