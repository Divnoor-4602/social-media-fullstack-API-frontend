import express from "express";
import bodyParser from "body-parser";

// creating a server
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ user: ["user1", "user2", "user3"] });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
