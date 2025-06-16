# 🎮 API de Jogos com Front-end

Este projeto fornece uma API completa para o gerenciamento de jogos, com funcionalidades CRUD (Criar, Ler, Atualizar, Deletar) e pesquisa por palavras-chave. A API é complementada por um front-end interativo para facilitar o uso.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Dotenv**

### Frontend
- **HTML/CSS/JS**
- **Fetch API**

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
MONGODB_URI=mongodb://localhost:27017/nomeDoBanco
PORT=3000
```

---

## ▶️ Executando a Aplicação

```bash
npm start
```

- A API estará disponível em: `http://localhost:5078`


---

## 📚 Endpoints da API

### 🔹 GET `/game`
**Descrição**: Lista todos os jogos.

**Exemplo de Resposta**:

```json
[
  {
        "v": false,
        "_id": "67e1fb7b137d2ce419a9140d",
        "nome": "Valorant 2.0",
        "nota": null,
        "genero": "Gênero não disponível",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",

  },

  {
        "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",

  }
]
```

### 🔹 POST `/game`
**Descrição**: Cria um novo jogo.

**Exemplo de corpo da requisição:**

```json
{
        "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",
}
```
**Exemplo de resposta:**
```json
{
  "message": "Jogo criado com sucesso!",
  "game": {
        "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",
  }
}
```

### 🔹 GET `/game/search/:keyword`
**Descrição**: Pesquisa jogos utilizando uma palavra-chave.

**Exemplo de requisição:**
```
GET /game/search/Jogo
```

**Exemplo de resposta:**

```json
[
  {
        "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",
  }
]
```

### 🔹 GET `/game/:id`
**Descrição**: Retorna um jogo pelo seu ID.

**Exemplo de requisição:**
```
GET /game/60a5f98f3b3f7d5b9c75bc5e
```

**Exemplo de resposta:**

```json
{
        "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",
}
```

### 🔹 PUT `/game/:id`
**Descrição**: Atualiza um jogo existente.

**Exemplo de corpo da requisição:**

```json
{
  "name": "Jogo Teste Atualizado",
  "description": "Nova descrição do Jogo Teste"
}
```

**Exemplo de resposta:**

```json
{
  "message": "Jogo atualizado com sucesso!",
  "game": {
    "v": true,
        "_id": "67eb1a676462e47dff350fd0",
        "nome": "Valorant",
        "nota": null,
        "genero": "Action, Shooter, Strategy",
        "plataformas": "PC",
        "dataCriacao": "2025-03-25T00:40:27.709Z",
  }
}
```

### 🔹 DELETE `/game/:id`
**Descrição**: Deleta um jogo pelo seu ID.

**Exemplo de resposta:**
```json
{
  "message": "Jogo removido com sucesso!"
}
```

---

## 📁 Estrutura do Projeto

```
projeto/
├── dump/
│   ├── test/
├── node_modules/
├── src/
│   └── config/
        └── dbConnect.js
        └── json.js
    └── controllers/
        └── apiController.js
        └── authController.js
        └── gameController.js
        └── userController.js
    └── middleware/
        └── middleware.js
    └── models/
        └── api.js
        └── game.js
        └── user.js
    └── repositories/
        └── apiRepository.js
        └── authRepository.js
        └── gameRepository.js
        └── userRepository.js
    └── routers/
        └── authRoutes.js
        └── gameRoutes.js
        └── index.js
        └── userRoutes.js
    └── services/
        └── apiService.js
        └── authService.js
        └── gameService.js
        └── userService.js
    └── app.js
├── viewer/
    └── src/
        └── index.html
        └── package-lock 2.json
        └── package-lock.json
        └── package.json
        └── postcss.config.js
        └── tailwind.config.js
        └── vite.config.js
├── .env
├── server.js
└── README.md
```

---

## 🧪 Front-End

A interface web permite consultar os jogos cadastrados diretamente pela URL ou formulário de busca. Ideal para testes rápidos ou interação visual com a base.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
