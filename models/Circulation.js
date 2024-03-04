const mongoose = require("mongoose");

const circulationSchema = mongoose.Schema({
  MemberID: { type: Number, required: true },
  BookID:  { type: Number, required: true },
  BookName: {type: String, required: true},
  IssueDate : { type: Date },
  ReturnDate : { type: Date},
  active:{type: Boolean},
});


module.exports = mongoose.model("Circulation", circulationSchema);