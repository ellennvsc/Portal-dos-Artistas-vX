import db from './database.js';

async function up() {
  const database = await db.connect();

  await database.run(`INSERT INTO Eventos (NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao) VALUES 
	('Show da Banda X', 'Um show incrível da Banda X', '2024-09-10 20:00:00', 'Estádio Y', 'Organizador A', 'Ingressos a partir de R$50', 'http://example.com/cartaz1.jpg', '2024-08-01'),
	('Exposição de Arte Y', 'Uma exposição de arte contemporânea', '2024-09-12 10:00:00', 'Galeria Z', 'Organizador B', 'Entrada gratuita', 'http://example.com/cartaz2.jpg', '2024-08-05')`);

  await database.run(`INSERT INTO InscricoesEventos (EventoID, UsuarioID, DataInscricao) VALUES 
	(1, 101, '2024-08-15 14:30:00'),
	(2, 102, '2024-08-16 09:00:00')`);

  await database.close();
}

export default { up };