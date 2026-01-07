import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
