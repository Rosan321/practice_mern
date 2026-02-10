import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
});

export default mongoose.model("Todo", todoSchema);
