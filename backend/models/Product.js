import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
