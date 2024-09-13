import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import Events from './models/events.js';
import Ingressos from './models/ingressos.js';

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("helloWorld")
})

app.get('/events/all', async( req, res) => {
    try{
        const events = await Events.allEvents();
        res.json(events)
    }catch(err){
        console.log(err)
    }
})

app.get('/ingressos/all', async( req, res) => {
    try{
        const ingressos = await Ingressos.allIngressos();
        res.json(ingressos)
    }catch(err){
        console.log(err)
    }
})

app.get('/ingressos/:id', async( req, res) => {
    try{
        const ingresso = await Ingressos.ingressoId(req.params.id);
        res.json(ingresso)
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
