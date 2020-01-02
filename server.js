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
    email: "quentin@t.fr",
    pwd: "aze123"
  },
  {
    id: 2,
    firstName: "Camille",
    email: "camille@t.fr",
    pwd: "qsd12"
  }
];

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  console.log("authorizationHeader", authorizationHeader);
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token , no access" });
  }
  console.log("token", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    console.log("before err");
    if (err) {
      console.log("inside err", err);

      return res.status(403);
    }
    console.log("data >>>", data);
    req.user = data.email;
  });
  next();
}

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/login", (req, res) => {
  res.send("Login page");
});

app.post("/login", (req, res) => {
  console.log("req.body", req.body);
  const student = students.find(s => s.email === req.body.email);
  console.log("student", student);
  if (student) {
    const token = jwt.sign(
      { text: "coucou", email: student.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: `Hi ${student.firstName}`, token });
  } else {
    res.status(401).json({ message: "Not recognized" });
  }
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/profile/:id", verifyToken, (req, res) => {
  console.log("profile/:id req.user", req.user);
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  console.log("student", student);
  res.status(200).json(student);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
