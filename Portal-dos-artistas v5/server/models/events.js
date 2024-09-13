import Database from "../database/database.js";

async function allEvents() {
  const db = await Database.connect();

  const sql = `
    SELECT 
        events.*, 
        organizer.*
    FROM events
    JOIN organizer ON events.organizerId = organizer.id;
    `;

  const events = await db.all(sql);
  //console.log(events)
  return events
}

export default { allEvents}