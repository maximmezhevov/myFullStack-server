import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    // required: true,
    // unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: {
    typeof: String
  }
}, {
  timestamps: true
})

export default mongoose.model('User', UserSchema)