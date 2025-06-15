import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ mode, onClose }) {
  const navigate = useNavigate();
  const [forgotMode, setForgotMode] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (mode === "register" && !name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    if (!password && !forgotMode) newErrors.password = "Senha é obrigatória.";
    if (mode === "register" && !forgotMode) {
      if (!confirmPassword) newErrors.confirmPassword = "Confirme sua senha.";
      else if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (forgotMode) {
        await axios.post("http://localhost:3004/auth/forgot-password", { email });
        toast.success("Se o e-mail existir, enviaremos instruções.");
        return;
      }

      const payload = mode === "login"
        ? { email, password }
        : { name, email, password, confirmpassword: confirmPassword };

      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const response = await axios.post(`http://localhost:3004${endpoint}`, payload);

      if (mode === "login") {
        localStorage.setItem("token", response.data.token);
        toast.success("Login realizado!");
        onClose();
        navigate("/games");
      } else {
        toast.success("Cadastro realizado!");
        onClose();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao autenticar";
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">
          {forgotMode ? "Recuperar Senha" : mode === "login" ? "Entrar" : "Cadastrar"}
        </h2>

        {!forgotMode && mode === "register" && (
          <div>
            <input type="text" placeholder="Nome" className="w-full p-2 mb-1 rounded bg-black text-white border"
              value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}

        <div>
          <input type="email" placeholder="Email" className="w-full p-2 mb-1 rounded bg-black text-white border"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {!forgotMode && (
          <>
            <div>
              <input type="password" placeholder="Senha" className="w-full p-2 mb-1 rounded bg-black text-white border"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            {mode === "register" && (
              <div>
                <input type="password" placeholder="Confirmar senha" className="w-full p-2 mb-1 rounded bg-black text-white border"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            )}
          </>
        )}

        {mode === "login" && !forgotMode && (
          <div className="text-right text-sm">
            <button onClick={() => setForgotMode(true)} className="text-blue-400 hover:underline">
              Esqueci minha senha
            </button>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-violet-600 text-white rounded">
            {forgotMode ? "Enviar" : mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </div>

        {forgotMode && (
          <div className="text-center">
            <button onClick={() => setForgotMode(false)} className="text-sm text-blue-400 hover:underline">
              Voltar ao login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
