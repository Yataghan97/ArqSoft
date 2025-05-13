import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3004';


// Função para exibir o formulário de Login
function showLoginForm() {
  document.getElementById('cadastroFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
}

// Função para exibir o formulário de Cadastro
function showCadastroForm() {
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('cadastroFormContainer').style.display = 'block';
}

// Evento para o formulário de Cadastro
document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value;
  const confirmpassword = document.getElementById('confirmarSenha').value;

  // Validação para verificar se a senha e a confirmação de senha são iguais
  if (senha !== confirmpassword) {
    alert("As senhas não coincidem! Tente novamente.");
    return;
  }

  // Chama a função para cadastrar o usuário
  await cadastrarUsuario(nome, email, senha, confirmpassword);
});

// Função para cadastrar o usuário
const cadastrarUsuario = async (nome, email, senha, confirmpassword) => {
  try {
    const response = await axios.post('http://localhost:3004/auth/register', {
      name: nome,
      email: email,
      password: senha,
      confirmpassword: confirmpassword
    });

    if (response.status === 201) {
      alert("Usuário cadastrado com sucesso!");
      // Após o cadastro, pode redirecionar para a página de login ou outro lugar
      showLoginForm();
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response ? error.response.data : error.message);
  }
};

// Evento para o formulário de Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;

  // Chama a função para realizar o login
  await loginUsuario(email, senha);
});

// Função para realizar o login
const loginUsuario = async (email, senha) => {
  try {
    const response = await axios.post('http://localhost:3004/auth/login', {
      email: email,
      password: senha
    });

    if (response.status === 200) {
      alert("Login bem-sucedido!");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error.response ? error.response.data : error.message);
  }
};
