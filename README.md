# API de Jogos (Game API)

Esta API oferece funcionalidades para gerenciar **jogos**. A API permite realizar operações CRUD (Criar, Ler, Atualizar, Deletar) para jogos e também permite a pesquisa de jogos com base em palavras-chave.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**

## Instrucoes de instalacao

Para rodar esta aplicação, é necessário realizar a instalação do Node.js. Você pode obter o instalador no site oficial.

O Express é instalado via o comando:

bash

npm install express
E o MongoDB é instalado via:

bash

npm install mongoose dotenv
Por último, altere as informações no arquivo .env para as configurações do banco de dados solicitado.



## Endpoints

A seguir estão os endpoints que a API oferece:

### 1. **GET** `/game`

**Descrição**: Retorna todos os jogos cadastrados.

**Exemplo de resposta**:
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

### 2. **POST** `/game`

**Descrição**: Cria um novo jogo.

**Exemplo de corpo da requisição**:
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

**Exemplo de resposta**:
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

### 3. **GET** `/game/search/:keyword`

**Descrição**: Pesquisa jogos utilizando uma palavra-chave.

**Exemplo de requisição**:
```
GET /game/search/Jogo
```

**Exemplo de resposta**:
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

### 4. **GET** `/game/:id`

**Descrição**: Retorna um jogo pelo seu ID.

**Exemplo de requisição**:
```
GET /game/60a5f98f3b3f7d5b9c75bc5e
```

**Exemplo de resposta**:
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

### 5. **PUT** `/game/:id`

**Descrição**: Atualiza as informações de um jogo.

**Exemplo de corpo da requisição**:
```json
{
  "name": "Jogo Teste Atualizado",
  "description": "Nova descrição do Jogo Teste"
}
```

**Exemplo de resposta**:
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

### 6. **DELETE** `/game/:id`

**Descrição**: Deleta um jogo pelo seu ID.

**Exemplo de resposta**:
```json
{
  "message": "Jogo removido com sucesso!"
}



npm install --save-dev @vitejs/plugin-react

```
chmod +x node_modules/.bin/vite
