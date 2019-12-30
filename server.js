const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    firstName: "Quentin"
  },
  {
    id: 2,
    firstName: "Camille"
  }
];

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/login", (req, res) => {
  res.send("Login page");
});

app.post("/login", (req, res) => {
  console.log("req.body", req.body);
  res.status(200).send(req.body);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
