const jargonWord = require("../database/index").Word;
const wordData = require("../database/finalData.json");

jargonWord.insertMany(wordData, (err, data) => {
  if (err) {
    console.log("Error in db insert many", err);
  }
  console.log("Data successfully added", data);
});
