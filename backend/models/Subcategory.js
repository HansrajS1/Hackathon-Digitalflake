import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Subcategory", subcategorySchema);
