import express from "express";
import bodyParser from "body-parser";

// creating a server
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

// route for registering the user in the database
app.post("/auth/register", (req, res) => {
  console.log("register route");
});

// route to login and verify the user
app.post("/auth/login", (req, res) => {
  console.log("login route");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
