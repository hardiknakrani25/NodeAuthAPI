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
app.listen(5000, () => console.log("Server Started On Port 5000"));
