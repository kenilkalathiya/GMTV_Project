const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profilePhoto: { type: Object, required: true}
});

var Users = mongoose.model("users", userSchema);

module.exports = Users;