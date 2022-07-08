const mongoose = require("mongoose");

const trackingSchema = mongoose.Schema({
    userID: { type: String, required: true },
  msID: { type: String, required: true },
  media_type: { type: String, required: true },
  addedDate: { type: String, required: true },
  seasons: { type: Number, required: true },
  last_seasons_episodes: { type: Number, required: true }
});

var TrackinfInfo = mongoose.model("tracking", trackingSchema);

module.exports = TrackinfInfo;