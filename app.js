const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const expireSession = "30s";

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api", verifyToken, (req, res) => {
  jwt.verify(req.token, "MySecret", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post is Created . . . ",
        data
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/login", (req, res) => {
  //Dummy user
  const user = {
    id: 1,
    username: "Hardik",
    email: "hardik@gmail.com"
  };
  jwt.sign({ user }, "MySecret", { expiresIn: expireSession }, (err, token) => {
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
