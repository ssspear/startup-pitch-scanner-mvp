const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pitch-scanner-mvp", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

const wordSchema = mongoose.Schema({
  category: String,
  word: String,
  replace: String
});

const Word = mongoose.model("Words", wordSchema);

const selectAll = callback => {
  Word.find({}, (err, words) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, words);
    }
  });
};

module.exports = { selectAll, Word };
