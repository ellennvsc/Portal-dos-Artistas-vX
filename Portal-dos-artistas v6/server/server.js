const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
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

app.get('/api/eventos', (req, res) => {
    const eventos = [
        { nome: 'Show da Banda X', data: '2024-09-10' },
        { nome: 'Exposição de Arte Y', data: '2024-09-12' }
    ];
    res.json(eventos);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
