const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura a pasta 'client' para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'client')));

// Rota principal para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Exemplo de rota para fornecer dados dinâmicos
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
