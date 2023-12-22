//seed.js
import Database from "better-sqlite3";
const db = new Database("database.db"); //creates the db
//designs the db
db.exec(`
CREATE TABLE IF NOT EXISTS messages(
name TEXT,
message TEXT)
`);
// Data to insert (an array of arrays containing name and number pairs)
const messages = [
  [
    "The McConnell-Thompsons",
    "What a fabulous evening. The reception is always warm at the Kemptons' house, can't wait until our next games evening!",
  ],
];
// Add as many name and number pairs as needed
// Prepare the statement for insertion
const stmt = db.prepare(`INSERT INTO messages(name,message ) VALUES (?, ?)`);

// Insert multiple rows using a loop
messages.forEach((message) => {
  console.log(message[0], message[1]);
  stmt.run(message[0], message[1]);
});
