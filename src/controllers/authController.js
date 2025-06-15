import AuthService from "../services/authService.js";

class authController {
  static register = async (req, res) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(422).json({ msg: error.message });
    }
  };

  static login = async (req, res) => {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(422).json({ msg: error.message });
    }
  };

  static forgotPassword = async (req, res) => {
    try {
      const resultado = await AuthService.handleForgotPassword(req.body.email);
      return res.status(200).json({ message: resultado });
    } catch (err) {
      return res.status(500).json({ message: err.message || "Erro ao processar requisição." });
    }
  };
}

export default authController;
