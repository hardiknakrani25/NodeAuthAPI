const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api", verifyToken, (req, res) => {
  res.json({
    message: "Post is Created . . . "
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

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
