export default function Hero({ onLogin, onRegister }) {
  return (
    <section className="text-center py-20 px-4">
      <h2 className="text-5xl font-bold text-violet-500 mb-4">PESQGAMES</h2>
      <p className="text-gray-400 text-lg mb-8">
        Curiosidades de seus jogos em um unico lugar.
      </p>
      <div className="flex justify-center gap-4">
        <button onClick={onRegister} className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded text-white text-lg">Começar agora</button>
        <button onClick={onLogin} className="border border-white px-6 py-3 rounded text-white text-lg">Já tenho conta</button>
      </div>
    </section>
  );
}