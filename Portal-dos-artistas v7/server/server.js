import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import db from './database/database.js'; // Importar o módulo do banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para processar dados de formulários
app.use(cors());

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../client'))); // Ajuste o caminho se necessário

// Configurar o mecanismo de visualização
app.set('views', path.join(__dirname, '../client/views')); // Ajuste o caminho para as views
app.set('view engine', 'ejs');

// Rota principal para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/views', 'index.html')); // Ajuste o caminho se necessário
});

// Usar rotas definidas no arquivo routes/index.js
app.use('/api', routes);

// Rota para buscar eventos do banco de dados
app.get('/api/eventos', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});