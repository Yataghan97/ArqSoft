
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResultPage() {
  const query = useQuery();
  const nome = query.get("nome");
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (nome) {
      axios.get(`http://localhost:3004/addjogo?nome=${nome}`)
        .then(res => setJogos(res.data.jogos))
        .catch(() => setErro("Erro ao buscar os jogos."));
    }
  }, [nome]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-4">Resultados para: {nome}</h1>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Jogos encontrados:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jogos.map((jogo, index) => (
          <div key={index} className="bg-gray-800 text-white p-4 rounded shadow hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-bold mb-2">{jogo.nome}</h3>
            <p><strong>Nota:</strong> {jogo.nota}</p>
            <p><strong>Gênero:</strong> {jogo.genero}</p>
            <p><strong>Plataformas:</strong> {jogo.plataformas}</p>
            <p><strong>Data de Lançamento:</strong> {new Date(jogo.dataCriacao).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
