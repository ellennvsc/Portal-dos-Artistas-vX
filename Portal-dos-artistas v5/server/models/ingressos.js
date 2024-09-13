import Database from "../database/database.js";

async function allIngressos() {
  const db = await Database.connect();

  const sql = `
    SELECT 
        ingresso.*, 
        events.title AS event
    FROM ingresso
    JOIN events ON ingresso.eventId = events.id;
    `;

  const ingressos = await db.all(sql);
  return ingressos
}

async function ingressoId(id) {
    const db = await Database.connect();

    const sql = `
      SELECT 
          ingresso.*, 
          events.title AS event
      FROM ingresso
      JOIN events ON ingresso.eventId = events.id
      WHERE ingresso.id = ?;
      `;

    const ingresso = await db.get(sql, [id]);
    return ingresso
}

export default { allIngressos, ingressoId };