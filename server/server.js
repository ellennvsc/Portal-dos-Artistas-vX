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

// Rota para buscar eventos do banco de dados
/*app.get('/api/eventos', async (req, res) => {
    try {
        const database = await db.connect();
        const eventos = await database.all('SELECT * FROM Eventos');
        await database.close();
        res.json(eventos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para publicar um novo evento
app.post('/api/eventos', async (req, res) => {
    const { NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao } = req.body;
    try {
        const database = await db.connect();
        await database.run(`INSERT INTO Eventos (NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao]);
        await database.close();
        res.redirect('/'); // Redirecionar para a página inicial após a publicação
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/useres', async (req, res) => { 
    try {
        const user = await User.criarUser();

        res.send(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});*/

// Usar rotas definidas no arquivo routes/index.js

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});