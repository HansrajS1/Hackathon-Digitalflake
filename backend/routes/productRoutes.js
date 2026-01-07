import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      subcategory: req.body.subcategory,
      status: req.body.status,
      image: req.file ? req.file.path : null, 
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
