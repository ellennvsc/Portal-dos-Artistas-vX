const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Caminhos corretos para os arquivos JSON fora da pasta 'server'
const jsonFiles = {
    eventos: path.join(__dirname, '..', 'client', 'data', 'index', 'eventos.json'),
    eventosAnt: path.join(__dirname, '..', 'client', 'data', 'index', 'eventosant.json'),
    descricao: path.join(__dirname, '..', 'client', 'data', 'descricao.json'),
    ingressos: path.join(__dirname, '..', 'client', 'data', 'ingressos.json')
};

// Função para carregar dados dos arquivos JSON individualmente
function loadEventsFromFiles() {
    let data = {
        eventos: [],
        eventosAnt: [],
        descricao: [],
        ingressos: []
    };

    Object.keys(jsonFiles).forEach(key => {
        const file = jsonFiles[key];
        try {
            if (fs.existsSync(file)) { // Verifica se o arquivo existe
                const fileData = fs.readFileSync(file, 'utf8');
                data[key] = JSON.parse(fileData);
            } else {
                console.error(`Arquivo não encontrado: ${file}`);
            }
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${file}:`, error);
        }
    });

    return data;
}

// Carregar dados dos arquivos JSON
let data = loadEventsFromFiles();

// Exemplo de como você pode acessar dados específicos
console.log('Eventos:', data.eventos);
console.log('Eventos Antigos:', data.eventosAnt);
console.log('Descrição:', data.descricao);
console.log('Ingressos:', data.ingressos);

// Função para salvar dados em todos os arquivos JSON
function saveDataToFiles(data) {
    Object.keys(jsonFiles).forEach(key => {
        const file = jsonFiles[key];
        try {
            fs.writeFileSync(file, JSON.stringify(data[key], null, 2), 'utf8');
        } catch (error) {
            console.error(`Erro ao salvar o arquivo ${file}:`, error);
        }
    });
}

// Rotas REST API
app.get('/api/events', (req, res) => {
    res.json(data.eventos);
});

app.get('/api/events/:id', (req, res) => {
    const event = data.eventos.find(e => e.id === parseInt(req.params.id));
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    newEvent.id = data.eventos.length + 1; // Simples incremento de ID
    data.eventos.push(newEvent);
    saveDataToFiles(data);
    res.status(201).json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
    const event = data.eventos.find(e => e.id === parseInt(req.params.id));
    if (event) {
        Object.assign(event, req.body);
        saveDataToFiles(data);
        res.json(event);
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

app.delete('/api/events/:id', (req, res) => {
    const index = data.eventos.findIndex(e => e.id === parseInt(req.params.id));
    if (index !== -1) {
        data.eventos.splice(index, 1);
        saveDataToFiles(data);
        res.status(204).send();
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
