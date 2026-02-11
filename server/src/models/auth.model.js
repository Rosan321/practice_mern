import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ✅ prevent duplicate emails
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // ✅ removes __v
  },
);

export default mongoose.model("Auth", authSchema);
