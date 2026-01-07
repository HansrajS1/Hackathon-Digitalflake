import express from "express";
import Subcategory from "../models/Subcategory.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const subcategory = await Subcategory.create({
            name: req.body.name,
            category: req.body.category,
            status: req.body.status,
            image: req.file ? req.file.path : null,
        });

        res.status(201).json(subcategory);
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

        const subcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate("category");
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id)
            .populate("category");

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ message: "Invalid Subcategory ID" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        res.json({ message: "Subcategory deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
