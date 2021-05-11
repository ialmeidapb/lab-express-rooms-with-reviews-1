require("dotenv").config();

const express = require("express");

const PORT = 4000;

const app = express();


// Importando as configurações do banco de dados e inicializando a conexão
const db = require("./config/db.config");
db();

// Configurar o express para entender requisições contendo JSON no corpo
app.use(express.json());


// Inicia o servidor para escutar requisições HTTP na porta 4000
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));


// Importa e configura nossas rotas
const roomRouter = require("./routes/room.routes");

app.use("/", roomRouter);