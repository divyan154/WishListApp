import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
// {
//     _id: ObjectId("..."),          // MongoDB ID
//     firebaseUid: "abc123xyz",     // Firebase UID
//     name: "Alice",
//     email: "alice@example.com"
//   }
