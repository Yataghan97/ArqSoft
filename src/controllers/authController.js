import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import SECRET from '../config/json.js'


class authController {
static register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // validations
  if (!name || !email || !password || password !== confirmpassword) {
    return res.status(422).json({ msg: "Dados inválidos!" });
  }

  //Caracteristicas da senha 8 caracteres, 1 maiusculo e 1 minusculo
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      msg: "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula e 1 número."
    });
  }


  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return res.status(422).json({
      msg: "O email deve ser válido"
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name,
    email,
    passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

static login = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: "Dados inválidos!" });
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.passwordHash);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

}

export default authController;

/**
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "minhaSenha123",
  "confirmpassword": "minhaSenha123"
} 
 */