//import http from "http";
import app from "./src/app.js";
import "dotenv/config"

const PORT = 3004;

const rotas = {
    "/": "Api com Node e Express.js",
    "/posts": "Rota de postagens",
    "/autores": "Rota dos autores"
};

//const server = http.createServer((req, res) => {
// res.writeHead(200, {"Content-Type": "text/plain"});
// res.end(rotas[req.url]);
// });

app.listen(PORT, () => {
    console.log("Servidor funcionando")
});