import db from './database.js';

async function up() {
  const database = await db.connect();

  await database.run(`CREATE TABLE IF NOT EXISTS Eventos (
    EventoID INTEGER PRIMARY KEY AUTOINCREMENT,
    NomeEvento TEXT NOT NULL,
    Descricao TEXT NOT NULL,
    DataHora DATETIME NOT NULL,
    Localizacao TEXT NOT NULL,
    Organizador TEXT NOT NULL,
    InfoIngresso TEXT,
    ImagemCartaz TEXT,
    DataPublicacao DATE NOT NULL
  )`);

  await database.run(`CREATE TABLE IF NOT EXISTS InscricoesEventos (
    InscricaoEventoID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventoID INTEGER NOT NULL,
    UsuarioID INTEGER NOT NULL,
    DataInscricao DATETIME NOT NULL,
    FOREIGN KEY(EventoID) REFERENCES Eventos(EventoID)
  )`);

  await database.close();
}

export default { up };