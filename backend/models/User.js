import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  userName: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
