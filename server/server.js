import express from 'express';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import rotas from './src/routes/routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para processar dados de formulários
app.use(cors());
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.send("hello-world");
})

app.use("/", rotas);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;