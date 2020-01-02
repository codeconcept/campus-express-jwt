const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    firstName: "Quentin",
    email: "quentin@test.fr"
  },
  {
    id: 2,
    firstName: "Camille",
    email: "camille@test.fr"
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
  const token = jwt.sign(
    { text: "coucou", email: req.body.email },
    process.env.JWT_SECRET
  );
  res.status(200).json(token);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  console.log("student", student);
  res.status(200).json(student);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
