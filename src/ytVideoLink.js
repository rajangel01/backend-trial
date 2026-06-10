const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  youtubeVideoUrl: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("ytLinkSettings", settingsSchema);