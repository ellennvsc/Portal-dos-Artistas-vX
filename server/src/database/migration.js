import db from './database.js';

async function up() {
  const database = await db.connect();

  await database.run(`CREATE TABLE IF NOT EXISTS Eventos (
    EventoID INTEGER PRIMARY KEY AUTOINCREMENT,
    NomeEvento TEXT NOT NULL,
    DataHora DATETIME NOT NULL,
    Localizacao TEXT NOT NULL,  
    Descricao TEXT NOT NULL,
    NomeOrganizador TEXT NOT NULL,
    ContatoOrganizador TEXT,
    InfoIngresso TEXT,
    ImagemCartaz TEXT,
    DataPublicacao DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await database.run(`CREATE TABLE IF NOT EXISTS InscricoesEventos (
    InscricaoEventoID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventoID INTEGER NOT NULL,
    UsuarioID INTEGER NOT NULL,
    DataInscricao DATETIME NOT NULL,
    CPF TEXT NOT NULL,
    Email TEXT NOT NULL,
    MetodoPagamento TEXT NOT NULL,
    NumeroCartao TEXT,
    NomeCartao TEXT,
    ValidadeCartao TEXT,
    CVVCartao TEXT,
    ChavePix TEXT,
    BoletoGerado BOOLEAN DEFAULT 0,
    FOREIGN KEY(EventoID) REFERENCES Eventos(EventoID)
  )`);

  await database.close();
}

export default { up };