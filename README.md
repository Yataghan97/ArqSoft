# 🧾 ContentManager API - Plataforma de Gerenciamento de Publicações

Uma API RESTful robusta construída com Node.js, focada na gestão de conteúdo, autenticação segura e arquitetura modular.

## ✨ Recursos Principais

- 🔐 **Login com JWT** - Autenticação protegida por token
- 👤 **Gestão de Usuários** - Operações CRUD com verificação
- ✒️ **Administração de Autores** - Controle completo de criadores de conteúdo
- 📰 **Publicações** - CRUD de posts com busca inteligente
- 🔍 **Pesquisa Avançada** - Filtragem por palavras-chave
- 🏗️ **Design em Camadas** - Separação clara de responsabilidades
- 📑 **Swagger** - Interface interativa para explorar a API
- 🔒 **Criptografia de Senhas** - Segurança com bcrypt
- 🧾 **Validação de Entrada** - Estrutura robusta via Mongoose

## ⚙️ Tecnologias Empregadas

| Ferramenta | Versão | Função |
|------------|--------|--------|
| Node.js | 18+ | Ambiente de execução JavaScript |
| Express | ^4.21.2 | Framework para APIs |
| MongoDB | ^6.14.2 | Banco de dados orientado a documentos |
| Mongoose | ^6.0.0 | Mapeamento ODM |
| JWT | ^9.0.2 | Token de autenticação |
| Bcrypt | ^3.0.2 | Proteção de senhas |
| Swagger | ^6.2.8 | Documentação da API |
| Nodemon | ^3.1.9 | Monitoramento de mudanças no código |

## 📦 Pré-requisitos

- Node.js 18+
- MongoDB local ou remoto (Atlas)
- Git
- npm ou yarn

## 🚧 Instalação

```bash
git clone https://github.com/seu-usuario/contentmanager-api.git
cd contentmanager-api
npm install
```

Crie um arquivo `.env` com as configurações:

```env
DB_CONNECTION_STRING=mongodb://localhost:27017/cmdb
JWT_SECRET=sua_chave_segura
NODE_ENV=development
PORT=3000
```

Inicie a aplicação:

```bash
# Ambiente de desenvolvimento
npm run dev

# Modo produção
npm start
```

## 📚 Documentação Interativa

Acesse após iniciar o servidor:

```
http://localhost:3000/api-docs
```

## 🔗 Principais Rotas

- `POST /auth/login` - Login com email/senha
- `GET /users` - Listar usuários
- `POST /authors` - Criar autor (requer login)
- `POST /posts` - Publicar conteúdo (requer login)
- `GET /posts/search/:keyword` - Busca por palavras-chave

## 🧱 Organização dos Arquivos

```
project-root/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dtos/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── app.js
├── .env
├── package.json
└── server.js
```

## 🧪 Testes

- Swagger UI: `/api-docs`
- Postman: importe a collection
- curl: veja exemplos abaixo

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Ana", "email": "ana@email.com", "password": "123456"}'
```

## 🚀 Deploy

### Heroku

```bash
heroku login
heroku create contentmanager-api
heroku config:set JWT_SECRET=xxx DB_CONNECTION_STRING=xxx
git push heroku main
```

## 🤝 Como Contribuir

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit suas mudanças: `git commit -m 'feat: nova feature'`
4. Push: `git push origin feature/sua-feature`
5. Envie um Pull Request

## 🛡️ Segurança

- Hash de senhas com bcrypt
- Tokens expiram em 24h
- CORS habilitado para desenvolvimento

## 📌 Licença

Distribuído sob a licença MIT.

---

⭐ Se curtir, deixe uma estrela!
