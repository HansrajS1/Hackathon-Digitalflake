import express from "express";
import Category from "../models/Category.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      status: req.body.status,
      image: req.file?.path,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Invalid Category ID" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) updateData.image = req.file.path;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(category);
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

export default router;
