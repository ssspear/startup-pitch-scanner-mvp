const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const database = require("../database/index.js");
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("and we are up!");
});

// app.get("/items", (req, res) => {
//   items.selectAll((err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`I am listening on port ${port}!`);
});
