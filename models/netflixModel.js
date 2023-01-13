const mongoose = require("mongoose");

const netflixSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Item must have a title"],
  },
  type: {
    type: String,
  },
  service: String,
  country: String,
  date_entered: [Date],
});

//TEST
const Netflix = mongoose.model("Netflix", netflixSchema, 'netflix');

module.exports = Netflix;
