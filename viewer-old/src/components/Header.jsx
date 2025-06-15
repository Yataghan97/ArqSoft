import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ onLogin, onRegister }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]); // atualiza ao mudar de rota

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isGamesPage = location.pathname === "/games";

  return (
    <header className="p-6 flex justify-between items-center border-b border-gray-700 bg-black">
      <h1 className="text-2xl font-bold text-violet-500">PESQGAMES</h1>
      <div className="flex gap-4">
        {isGamesPage && isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Sair
          </button>
        ) : (
          <>
            <button onClick={onLogin} className="border px-4 py-2 rounded text-white">
              Login
            </button>
            <button onClick={onRegister} className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded text-white">
              Cadastrar
            </button>
          </>
        )}
      </div>
    </header>
  );
}
