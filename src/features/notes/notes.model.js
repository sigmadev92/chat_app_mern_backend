import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Note", noteSchema);

export default Notes;
