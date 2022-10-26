import express from "express";
import { famousPeople } from "./famousPeople.js";
import { getRandomCelebrity } from "./getRandomCelebrity.js";

const users = {};

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  let celebrityA = getRandomCelebrity(famousPeople);
  let celebrityB = getRandomCelebrity(famousPeople);
  let celebArray = [celebrityA, celebrityB];
  res.send(celebArray);
});

app.post("/", (req, res) => {
  let body = req.body;
  let name = body.newName;
  let score = 0;
  if (users[name] && users[name] > body.score) {
    score = users[name];
  } else {
    score = body.score;
  }
  users[name] = score;
  console.log(users);
  res.send(users);
});

app.get("/scores", (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
