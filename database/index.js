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

const addWord = (newWord, callback) => {
  let data = new Word(newWord);
  data.save((err, data) => {
    if (err) {
      console.log("error in db save", err);
      callback(err);
    } else {
      console.log("saved!", data);
      callback(null, data);
    }
  });
};

module.exports = { selectAll, addWord, Word };
