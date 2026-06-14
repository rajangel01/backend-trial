// models/DailyTest.js

const mongoose = require("mongoose");

const dailyTestSchema = new mongoose.Schema({
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },{
    type: mongoose.Schema.Types.qId,
    ref: "Question"
  }
],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DailyTest", dailyTestSchema);