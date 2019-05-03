const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

//FOR BODY PARSER
app.use(express.json());

//Expiration Time of Token
const expireSession = "30s";

//ADD SECRET KEY OF USER
const secret = "MySecret";

//Test API
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

//API FOR VERIFY THE USER

app.post("/api", verifyToken, (req, res) => {
  //VERIFY THE TOKEN
  jwt.verify(req.token, secret, (err, data) => {
    if (err) {
      //FORBIDDEN
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post is Created . . . ",
        data
      });
    }
  });
});

//FUNCTON TO ACCESS TOKEN
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    //IF TOKEN IS NOT AVAILABLE IN HEADERS SEND FORBIDDEN
    res.sendStatus(403);
  }
}

//API TO GENERATE THE TOKEN USING THE USER DATA
app.post("/api/login", (req, res) => {
  const user = {
    id: req.body.phone,
    username: req.body.user,
    email: req.body.email
  };

  //GENERATE THE TOKEN USING THE SECERET
  //ASSIGN TIME FOR EXPIRATION OF THE TOKEN
  jwt.sign({ user }, secret, { expiresIn: expireSession }, (err, token) => {
    if (!err) {
      //SEND TOKEN TO THE USER
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
