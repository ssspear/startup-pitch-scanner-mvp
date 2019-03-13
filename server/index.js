const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const database = require("../database/index.js");

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("and we are up!");
});

app.get("/words", (req, res) => {
  database.selectAll((err, data) => {
    if (err) {
      console.log("error in get", err);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`I am listening on port ${port}!`);
});
