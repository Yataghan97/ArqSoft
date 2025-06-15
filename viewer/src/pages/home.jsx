import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Home({ onLogin, onRegister }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/resultados?nome=${encodeURIComponent(search)}`);
  };

  return (
    <section
      className="text-center py-20 px-4 bg-cover bg-center min-h-screen bg-black text-white"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <h2 className="text-6xl font-extrabold text-pink-500 drop-shadow mb-3">INFOGAMES</h2>
      <p className="text-lg mb-10">Curiosidades dos seus jogos em um único lugar.</p>

      <div className="flex justify-center items-center gap-2 max-w-xl mx-auto mb-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Consulte aqui"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full px-12 py-3 text-black text-lg shadow-inner outline-none"
          />
          <Search className="absolute left-4 top-3.5 text-pink-500" />
        </div>
        <button
          onClick={handleSearch}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-full text-lg"
        >
          Pesquisar
        </button>
      </div>

      <p className="mb-6">
        Salve seus jogos favoritos agora, basta logar ou criar uma conta
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRegister}
          className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded text-white text-lg"
        >
          Começar agora
        </button>
        <button
          onClick={onLogin}
          className="border border-white px-6 py-3 rounded text-white text-lg"
        >
          Já tenho conta
        </button>
      </div>
    </section>
  );
}
