import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const token = localStorage.getItem("token");

  const fetchGames = async () => {
    try {
      const res = await axios.get("api/game", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGames(res.data);
    } catch (err) {
      toast.error("Erro ao buscar jogos.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Você precisa estar logado.");
      return;
    }
    fetchGames();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.warning("Digite o nome de um jogo.");
      return;
    }

    try {
      const res = await axios.get(`api/addjogo?nome=${encodeURIComponent(search)}`);
      setSearchResult(res.data);
      toast.success("Jogo adicionado com sucesso!");
      setSearch(""); // limpa campo
      await fetchGames(); // atualiza a lista
    } catch (err) {
      toast.error("Erro ao buscar o jogo.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Lista de Jogos</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar jogo por nome..."
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-violet-600 hover:bg-violet-700 px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {searchResult && (
        <div className="mb-6 p-4 border border-violet-500 rounded bg-gray-800">
          <h2 className="text-lg font-semibold text-violet-400 mb-2">Resultado da busca:</h2>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}

      <ul className="space-y-2">
        {games.map((game, index) => (
          <li key={index} className="border p-4 rounded bg-gray-800">
            <pre>{JSON.stringify(game, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}