import express from "express";
import bodyParser from "body-parser";

// creating a server
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
