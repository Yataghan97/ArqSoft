import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AuthRepository from "../repositories/authRepository.js";

class AuthService {
  static async register({ name, email, password, confirmpassword }) {
    if (!name || !email || !password || password !== confirmpassword) {
      throw new Error("Dados inválidos!");
    }

    // Regex ajustada: apenas uma barra invertida
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula e 1 número.");
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      throw new Error("O email deve ser válido");
    }

    const userExists = await AuthRepository.findByEmail(email);
    if (userExists) {
      throw new Error("Por favor, utilize outro e-mail!");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return await AuthRepository.create({ name, email, passwordHash });
  }

  static async login({ email, password }) {
    if (!email || !password) {
      throw new Error("Dados inválidos!");
    }

    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const checkPassword = await bcrypt.compare(password, user.passwordHash);
    if (!checkPassword) {
      throw new Error("Senha inválida!");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    return { token, msg: "Autenticação realizada com sucesso!" };
  }

  static async handleForgotPassword(email) {
    if (!email) throw new Error("Email é obrigatório");

    const user = await AuthRepository.findByEmail(email);
    if (!user) return "Se o e-mail existir, enviaremos instruções.";

    const token = crypto.randomBytes(20).toString("hex");
    const expiration = Date.now() + 3600000;

    await AuthRepository.saveResetToken(user._id, token, expiration);

    console.log(`Link de recuperação: http://localhost:3004/reset-password/${token}`);

    return "Se o e-mail existir, enviaremos instruções.";
  }
}

export default AuthService;
