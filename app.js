const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api", (req, res) => {
  res.json({
    message: "Post is Created . . . "
  });
});
app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "Hardik",
    email: "hardik@gmail.com"
  };
  jwt.sign({ user }, "MySecret", (err, token) => {
    if (!err) {
      res.json({
        token
      });
    } else {
      res.json({
        err
      });
    }
  });
});
app.listen(5000, () => console.log("Server Started On Port 5000"));
