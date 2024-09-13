import Database from "./database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, "seeders.json");
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

async function up() {
  const db = await Database.connect();
  //console.log(jsonData)

  for (const event of jsonData.events) {
    const organizerSql = `
            INSERT INTO organizer 
            (name, role, image, verifiedImage) 
            VALUES (?, ?, ?, ?)
        `;
    const eventsSql = `
            INSERT INTO events 
            (title, date, description, image, detailsLink, inscriptionLink, likes, comments, downloads, organizerId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const ingressoSql = `
            INSERT INTO ingresso
            (qrCode, code, name, cpf, location, city, eventDay, price, transacao, eventId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
      
    const organizer = event.organizer;
    const organizerResult = await db.run(organizerSql, [
      organizer.name,
      organizer.role,
      organizer.image,
      organizer.verifiedImage,
    ]);
    const organizerId = organizerResult.lastID;

    const evento = await db.run(eventsSql, [
      event.title,
      event.date,
      event.description,
      event.image,
      event.detailsLink,
      event.inscriptionLink,
      event.stats.likes,
      event.stats.comments,
      event.stats.downloads,
      organizerId,
    ]);
    const eventId = evento.lastID;

    if(event.title === "The Town"){
      for (const ingresso of jsonData.ingressos) {
        await db.run(ingressoSql, [
          ingresso.qrCode,
          ingresso.code,
          ingresso.name,
          ingresso.cpf,
          ingresso.location,
          ingresso.city,
          ingresso.eventDay,
          ingresso.price,
          ingresso.transaction,
          eventId,
        ]);
      }
    }
  }

  console.log("Database seeded successfully");
}

export default { up };
