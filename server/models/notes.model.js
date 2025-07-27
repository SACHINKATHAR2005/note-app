import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",    
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Notes = mongoose.model("Notes", notesSchema);
