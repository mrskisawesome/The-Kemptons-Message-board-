import Database from "better-sqlite3";
const db = new Database("database.db");

import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.json("You are looking at root route. How roude!");
});

//sets up a route on a web server that listens for POST requests to path/messages
app.get("/messages", function (request, response) {
  console.log(request.body);
  //retrieves messages from my database and prepares a SQL query to select all from the table messages
  const messages = db.prepare("SELECT * FROM messages").all();
  //sends a JSON response back to the client which contains the json form of the message array
  response.json(messages);
});

//set up a route to handle POST requests to the /messages endpoint
app.post("/messages", function (request, response) {
  console.log(request.body);
  console.log("BEFORE");
  //finds the data from the body which is the writer of the message
  const name = request.body.name;
  //finds the data from the body which is the punchline of the message
  const message = request.body.message;
  //prepares a SQL query to insert a new row into the "messages" table, message punchline values
  //stored in newMessage
  const newMessage = db
    .prepare(`INSERT INTO messages (name, message) VALUES (?,?)`)
    .run(name, message);
  console.log("newMessage", newMessage);
  //sends a json response back to the client
  response.json(newMessage);
});

app.listen(8080, function () {
  console.log("Its working");
});
