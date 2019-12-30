const express = require("express");
const app = express();

const students = [
  {
    id: 1,
    firstName: "Erwan"
  },
  {
    id: 2,
    firstName: "Camille"
  }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
