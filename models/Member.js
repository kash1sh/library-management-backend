const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  MemberId: { type: Number, required: true },
  MemberName: { type: String, required: true },
});


module.exports = mongoose.model("Member", memberSchema);