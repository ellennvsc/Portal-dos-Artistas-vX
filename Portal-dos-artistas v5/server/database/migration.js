import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const createOrganizerTable = `
    CREATE TABLE IF NOT EXISTS organizer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(200) NOT NULL,
      role VARCHAR(200) NOT NULL,
      image VARCHAR(200) NOT NULL,
      verifiedImage VARCHAR(200) NOT NULL
    );
  `;

  const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(200) NOT NULL,
      date VARCHAR(20) NOT NULL,
      description VARCHAR(500),
      image VARCHAR(200) NOT NULL,
      detailsLink VARCHAR(100) NOT NULL,
      inscriptionLink VARCHAR(100) NOT NULL,
      likes VARCHAR(10) NOT NULL,
      comments VARCHAR(10) NOT NULL,
      downloads VARCHAR(10) NOT NULL,
      organizerId INTEGER,
      FOREIGN KEY (organizerId) REFERENCES organizer(id)
    );
  `;

  const createIngressTable = `
    CREATE TABLE IF NOT EXISTS ingresso (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      qrCode VARCHAR(200) NOT NULL,
      code VARCHAR(20) NOT NULL,
      name VARCHAR(80),
      cpf VARCHAR(20) NOT NULL,
      location VARCHAR(100) NOT NULL,
      city VARCHAR(50) NOT NULL,
      eventDay VARCHAR(20) NOT NULL,
      transacao VARCHAR(100) NOT NULL,
      price VARCHAR(15) NOT NULL,
      eventId INTEGER,
      FOREIGN KEY (eventId) REFERENCES events(id)
    );
  `

  try {
    await db.run(createOrganizerTable);
    await db.run(createEventsTable);
    await db.run(createIngressTable);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

export default { up };